package com.tipon.backend.auth;

import com.tipon.backend.auth.dto.AuthResponse;
import com.tipon.backend.auth.dto.GuestLoginRequest;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final CurrentUserService currentUserService;

    public AuthController(CurrentUserService currentUserService) {
        this.currentUserService = currentUserService;

    }

//    @GetMapping("/current")
//    public AuthResponse getCurrentUser() {
//        var user = currentUserService.getCurrentUser();
//        return new AuthResponse(user.getId(), user.getEmail(), user.getProvider(),
//                user.getCreatedAt());
//    }

    @PostMapping("/guest")
    public AuthResponse guestLogin(@RequestBody GuestLoginRequest request){
        var user = currentUserService.getOrCreateGuest(request.deviceId());
        String token = currentUserService.generateToken(user);

        return new AuthResponse(
                user.getId(),
                user.getProvider(),
                user.getEmail(),
                token,
                user.getCreatedAt()
        );
    }
}
