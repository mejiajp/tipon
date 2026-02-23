package com.tipon.backend.auth.dto;

import com.tipon.backend.user.AuthProvider;

import java.time.LocalDateTime;

import java.util.UUID;


public record UserResponse (
    UUID id,
    String email,
    AuthProvider provider,
    LocalDateTime createdAt
){}
