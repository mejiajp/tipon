package com.tipon.backend.auth.dto;

import com.tipon.backend.user.AuthProvider;

import java.time.LocalDate;


public record AuthResponse(
    Long id,
    AuthProvider provider,
    String email,
    LocalDate createdAt
){}
