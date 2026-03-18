package com.tipon.backend.auth;

import com.tipon.backend.auth.dto.AuthResponse;
import com.tipon.backend.auth.dto.GuestLoginRequest;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final CurrentUserService currentUserService;
    private final AuthCookieService authCookieService;

    public AuthController(CurrentUserService currentUserService,
                          AuthCookieService authCookieService) {
        this.currentUserService = currentUserService;
        this.authCookieService = authCookieService;

    }

    @GetMapping("/current")
    public AuthResponse getCurrentUser() {
        var user = currentUserService.getCurrentUser();
        return new AuthResponse(user.getId(), user.getProvider(),
                user.getEmail(),  user.getCreatedAt());
    }

    @PostMapping("/guest")
    public AuthResponse guestLogin(HttpServletRequest request, HttpServletResponse response){

        String deviceId =  authCookieService.getOrCreateDeviceId(request, response);

        var user = currentUserService.getOrCreateGuest(deviceId);

        String token = currentUserService.generateToken(user);

        authCookieService.setTokenCookie(response, token);
        return new AuthResponse(
                user.getId(),
                user.getProvider(),
                user.getEmail(),
                user.getCreatedAt()
        );
    }
    
}
