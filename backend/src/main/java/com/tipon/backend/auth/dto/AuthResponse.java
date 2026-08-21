package com.tipon.backend.auth.dto;

import com.tipon.backend.user.AuthProvider;

import java.time.LocalDate;


public record AuthResponse(
    Long id,
    String name,
    String profilePicture,
    String email,
    AuthProvider provider,
    LocalDate createdAt,
    String token,
    String deviceId
){}
