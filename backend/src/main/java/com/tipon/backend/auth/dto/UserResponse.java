package com.tipon.backend.auth.dto;

import com.tipon.backend.user.AuthProvider;

import java.time.LocalDate;

import java.util.UUID;


public record UserResponse (
    UUID id,
    String email,
    AuthProvider provider,
    LocalDate createdAt
){}
