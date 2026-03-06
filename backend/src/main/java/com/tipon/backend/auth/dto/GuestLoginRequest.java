package com.tipon.backend.auth.dto;

import java.util.UUID;

public record GuestLoginRequest (
    UUID deviceId
){}
