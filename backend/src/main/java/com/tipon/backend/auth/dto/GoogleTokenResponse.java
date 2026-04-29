package com.tipon.backend.auth.dto;

public record GoogleTokenResponse(
        String access_token,
        String id_token,
        String expires_in,
       String token_type
) {
}
