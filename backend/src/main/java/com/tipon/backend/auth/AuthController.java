package com.tipon.backend.auth;

import com.tipon.backend.auth.dto.AuthResponse;
import com.tipon.backend.auth.dto.GuestLoginRequest;
import com.tipon.backend.device.Device;
import com.tipon.backend.device.DeviceRepository;
import com.tipon.backend.user.AuthProvider;
import com.tipon.backend.user.User;
import com.tipon.backend.user.UserRepository;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.UUID;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final CurrentUserService currentUserService;
    private final AuthCookieService authCookieService;
    private final UserRepository userRepository;
    private final DeviceRepository deviceRepository;

    public AuthController(CurrentUserService currentUserService,
                          AuthCookieService authCookieService,
                          UserRepository userRepository,
                          DeviceRepository deviceRepository) {
        this.currentUserService = currentUserService;
        this.authCookieService = authCookieService;
        this.userRepository = userRepository;
        this.deviceRepository = deviceRepository;

    }

    @GetMapping("/me")
    public AuthResponse getMe(
            HttpServletRequest request,
            HttpServletResponse response
    ) {

        try {
            User user = currentUserService.getCurrentUser();
            return toResponse(user);
        } catch (Exception ignored) {
        }

        String deviceId = authCookieService.getExistingDeviceId(request);

        if (deviceId != null) {
            User guest = currentUserService.findGuestByDeviceId(deviceId);

            if (guest != null) {
                String token = currentUserService.generateToken(guest);
                authCookieService.setTokenCookie(response, token);

                return toResponse(guest);
            }
        }

        throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Not logged in");
    }

    private AuthResponse toResponse(User user) {
        return new AuthResponse(
                user.getId(),
                user.getName(),
                user.getProvider(),
                user.getEmail(),
                user.getCreatedAt()
        );
    }
    @PostMapping("/guest")
    public AuthResponse guestLogin(@RequestBody GuestLoginRequest body, HttpServletRequest request, HttpServletResponse response){

        String deviceId =  authCookieService.getOrCreateDeviceId(request, response);

        var user = currentUserService.getOrCreateGuest(deviceId, body.name());

        String token = currentUserService.generateToken(user);

        authCookieService.setTokenCookie(response, token);

        return new AuthResponse(
                user.getId(),
                user.getName(),
                user.getProvider(),
                user.getEmail(),
                user.getCreatedAt()
        );
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @PostMapping("/logout")
    public void logout(
            HttpServletRequest request,
            HttpServletResponse response
    ) {

        String deviceId = authCookieService.getExistingDeviceId(request);

        if (deviceId != null) {
            deviceRepository.findByDeviceId(deviceId)
                    .ifPresent(device -> {
                        userRepository.delete(device.getUser());
                        deviceRepository.delete(device);
                    });
        }

        authCookieService.clearTokenCookie(response);
        authCookieService.clearDeviceCookie(response);
    }

}
