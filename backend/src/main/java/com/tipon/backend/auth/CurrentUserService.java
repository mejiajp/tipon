package com.tipon.backend.auth;


import com.tipon.backend.auth.dto.AuthResponse;
import com.tipon.backend.auth.dto.GoogleLoginRequest;
import com.tipon.backend.auth.dto.GoogleTokenResponse;
import com.tipon.backend.device.Device;
import com.tipon.backend.device.DeviceRepository;
import com.tipon.backend.user.AuthProvider;
import com.tipon.backend.user.User;
import com.tipon.backend.user.UserRepository;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDate;
import java.util.Optional;


@Service
public class CurrentUserService {

    private final UserRepository userRepository;

    private final JwtService jwtService;

    private final AuthCookieService authCookieService;

    private final DeviceRepository deviceRepository;

    @Value("${google.client-id}")
    private String clientId;

    @Value("${google.client-secret}")
    private String clientSecret;

    public CurrentUserService(UserRepository userRepository, JwtService tokenService, AuthCookieService authCookieService, DeviceRepository deviceRepository) {
        this.userRepository = userRepository;
        this.jwtService = tokenService;
        this.authCookieService = authCookieService;
        this.deviceRepository = deviceRepository;
    }


    // Get existing guest or create a new one using deviceId
    public User getOrCreateGuest(String deviceId, String name) {
        // Get User
        Optional<Device> existingDevice = deviceRepository.findByDeviceId(deviceId);

        if (existingDevice.isPresent()) {
            return existingDevice.get().getUser();
        }

        // else Create User
        User guest = new User();
        guest.setName(name);
        guest.setEmail(null);
        guest.setProvider(AuthProvider.GUEST);
        guest.setGoogleId(null);
        guest.setCreatedAt(LocalDate.now());

        // Save user first to attach device
        User savedUser = userRepository.save(guest);

        Device device = new Device();
        device.setDeviceId(deviceId);
        device.setUser(savedUser);

        // Save device
        deviceRepository.save(device);

        return savedUser;
    }

    public User findGuestByDeviceId(String deviceId) {

        Optional<Device> device = deviceRepository.findByDeviceId(deviceId);

        if (device.isEmpty()) {
            return null;
        }

        User user = device.get().getUser();

        if (user.getProvider() != AuthProvider.GUEST) {
            return null;
        }

        return user;
    }

    public String generateToken(User user) {
        return jwtService.generateToken(user);
    }


    public User getCurrentUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        if (auth == null || !(auth.getPrincipal() instanceof User)) {
            throw new RuntimeException("No authenticated user found");
        }

        return (User) auth.getPrincipal();
    }

    public boolean isGuest(User user) {
        return user.getProvider() == AuthProvider.GUEST;
    }

    public AuthResponse googleLogin(String code,
                                    HttpServletResponse response) {

        GoogleTokenResponse tokenResponse = exchangeCodeForTokens(code);

        Jwt googleJwt = verifyGoogleIdToken(tokenResponse.id_token());

        String googleId = googleJwt.getSubject();
        String email = googleJwt.getClaimAsString("email");
        String name = googleJwt.getClaimAsString("name");

        User user = userRepository.findByGoogleId(googleId)
                .orElseGet(() -> {
            User newUser = new User();
            newUser.setGoogleId(googleId);
            newUser.setEmail(email);
            newUser.setName(name);
            newUser.setCreatedAt(LocalDate.now());
            newUser.setProvider(AuthProvider.GOOGLE);
            return userRepository.save(newUser);
        });

        String token = jwtService.generateToken(user);

        authCookieService.setTokenCookie(response, token);

        return new AuthResponse(
                user.getId(),
                user.getName(),
                user.getProvider(),
                user.getEmail(),
                user.getCreatedAt());
    }

    public AuthResponse linkGoogle(
            String code,
            HttpServletResponse response
    ) {

        User currentUser = getCurrentUser();

        if (currentUser.getProvider() != AuthProvider.GUEST) {
            throw new RuntimeException(
                    "Only guest accounts can be linked"
            );
        }

        GoogleTokenResponse tokenResponse =
                exchangeCodeForTokens(code);

        Jwt googleJwt =
                verifyGoogleIdToken(tokenResponse.id_token());

        String googleId = googleJwt.getSubject();
        String email = googleJwt.getClaimAsString("email");
        String name = googleJwt.getClaimAsString("name");

        // Prevent linking an already existing Google account
        Optional<User> existingGoogleUser =
                userRepository.findByGoogleId(googleId);

        if (existingGoogleUser.isPresent()) {
            throw new RuntimeException(
                    "Google account already linked to another user"
            );
        }

        currentUser.setGoogleId(googleId);
        currentUser.setEmail(email);
        currentUser.setName(name);
        currentUser.setProvider(AuthProvider.GOOGLE);

        User savedUser =
                userRepository.save(currentUser);

        String token =
                jwtService.generateToken(savedUser);

        authCookieService.setTokenCookie(
                response,
                token
        );

        return new AuthResponse(
                savedUser.getId(),
                savedUser.getName(),
                savedUser.getProvider(),
                savedUser.getEmail(),
                savedUser.getCreatedAt()
        );
    }

    private GoogleTokenResponse exchangeCodeForTokens(String code) {

        RestTemplate rest = new RestTemplate();

        MultiValueMap<String, String> form = new LinkedMultiValueMap<>();
        form.add("code", code);
        form.add("client_id", clientId);
        form.add("client_secret", clientSecret);
        form.add("redirect_uri", "http://localhost:3000");
        form.add("grant_type", "authorization_code");

        HttpHeaders headers = new HttpHeaders();

        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        HttpEntity<MultiValueMap<String,String>> request =
                new HttpEntity<>(form,headers);

        ResponseEntity<GoogleTokenResponse> response =
            rest.postForEntity(
                "https://oauth2.googleapis.com/token",
                request,
                GoogleTokenResponse.class
        );

        if(!response.getStatusCode().is2xxSuccessful() ||
            response.getBody() == null) {
            throw new RuntimeException("Failed to exchange Google auth code to tokens");
        }

        return response.getBody();
    }

    private Jwt verifyGoogleIdToken(String idToken) {

        NimbusJwtDecoder decoder = NimbusJwtDecoder
                .withJwkSetUri("https://www.googleapis.com/oauth2/v3/certs")
                .build();

        Jwt jwt = decoder.decode(idToken);

        if (!clientId.equals(jwt.getAudience().get(0))) {
            throw new RuntimeException("Invalid audience");
        }

        return jwt;
    }
}
