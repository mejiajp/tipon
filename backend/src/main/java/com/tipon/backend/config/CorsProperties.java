package com.tipon.backend.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import java.util.Arrays;
import java.util.List;

@Setter
@Getter
@Configuration
@ConfigurationProperties(prefix = "app.cors")
public class CorsProperties {

    /**
     * Stored as a single comma-separated string from env:
     * https://a.com,http://localhost:3000
     */
    private String allowedOrigins;

    /**
     * Safe conversion to List
     */
    public List<String> getAllowedOriginsList() {
        if (allowedOrigins == null || allowedOrigins.isBlank()) {
            return List.of("http://localhost:3000");
        }

        return Arrays.stream(allowedOrigins.split(","))
                .map(String::trim)
                .filter(s -> !s.isEmpty())
                .toList();
    }
}