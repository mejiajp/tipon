package com.tipon.backend.auth;

import com.tipon.backend.auth.dto.AuthResponse;
import com.tipon.backend.auth.dto.GoogleLoginRequest;
import com.tipon.backend.auth.dto.GuestLoginRequest;
import com.tipon.backend.device.DeviceRepository;
import com.tipon.backend.user.User;
import com.tipon.backend.user.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.UUID;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final CurrentUserService currentUserService;
//    private final AuthCookieService authCookieService;
    private final UserRepository userRepository;
    private final DeviceRepository deviceRepository;

    public AuthController(CurrentUserService currentUserService,
//                          AuthCookieService authCookieService,
                          UserRepository userRepository,
                          DeviceRepository deviceRepository) {
        this.currentUserService = currentUserService;
//        this.authCookieService = authCookieService;
        this.userRepository = userRepository;
        this.deviceRepository = deviceRepository;

    }

    @GetMapping("/me")
    public AuthResponse getMe(
        @RequestHeader(value = "X-Device-Id", required=false) String deviceId
    ) {

        try {
            User user = currentUserService.getCurrentUser();
            return toResponse(user, null, null);
        } catch (Exception ignored) {
        }

        if (deviceId != null) {
            User guest = currentUserService.findGuestByDeviceId(deviceId);

            if (guest != null) {
                String token = currentUserService.generateToken(guest);
                return toResponse(guest, token, deviceId);
            }
        }

        throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Not logged in");
    }

    private AuthResponse toResponse(User user, String token, String deviceId) {
        return new AuthResponse(
                user.getId(),
                user.getName(),
                user.getProvider(),
                user.getEmail(),
                user.getCreatedAt(),
                token,
                deviceId

        );
    }

    @PostMapping("/google")
    public AuthResponse googleLogin(@RequestBody GoogleLoginRequest request, HttpServletResponse response){
      return currentUserService.googleLogin(request.code(), response);
    }

    @PostMapping("/guest")
    public AuthResponse guestLogin(@RequestBody GuestLoginRequest body, @RequestHeader(value = "X-Device-Id", required = false)  String deviceId){


        String finalDeviceId = deviceId != null ? deviceId : UUID.randomUUID().toString();
        var user = currentUserService.getOrCreateGuest(finalDeviceId, body.name());
        String token = currentUserService.generateToken(user);

        return toResponse(user, token, finalDeviceId);
    }

    @PostMapping("/google/link")
    public AuthResponse linkGoogle(
            @RequestBody GoogleLoginRequest request,
            HttpServletResponse response
    ) {
        return currentUserService.linkGoogle(
                request.code(),
                response
        );
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @PostMapping("/logout")
    public void logout(
           @RequestHeader(value = "X-Device-Id", required = false) String deviceId
    ) {
        if (deviceId != null) {
            deviceRepository.findByDeviceId(deviceId)
                    .ifPresent(device -> {
                        userRepository.delete(device.getUser());
                        deviceRepository.delete(device);
                    });
        }
    }

}
