package com.tipon.backend.auth;

import com.tipon.backend.auth.dto.UserResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final CurrentUserService currentUserService;

    public AuthController(CurrentUserService currentUserService) {
        this.currentUserService = currentUserService;

    }

    @GetMapping("/current")
    public UserResponse getCurrentUser() {
        var user = currentUserService.getCurrentUser();
        return new UserResponse(user.getId(), user.getEmail(), user.getProvider(),
                user.getCreatedAt());
    }
}
