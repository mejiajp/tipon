package com.tipon.backend.auth.dto;

import com.tipon.backend.expense.Expense;
import com.tipon.backend.user.AuthProvider;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

// Token + User info later
@Setter
@Getter
public class UserResponse {
    private UUID id;
    private String email;
    private AuthProvider provider;
    private LocalDateTime createdAt;
    private List<Expense> expense;

    public UserResponse(UUID id, String email, AuthProvider provider, LocalDateTime createdAt, List<Expense> expense) {
        this.id = id;
        this.email = email;
        this.provider = provider;
        this.createdAt = createdAt;
        this.expense = expense;
    }
}
