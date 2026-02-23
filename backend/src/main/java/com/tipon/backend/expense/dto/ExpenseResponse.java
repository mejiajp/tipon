package com.tipon.backend.expense;

import com.tipon.backend.user.User;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;


@Setter
@Getter
public class ExpenseResponse {
    private UUID id;
    private BigDecimal amount;
    private String category;
    private String description;
    private LocalDateTime createdAt;
    private User user;

    public ExpenseResponse(UUID id, BigDecimal amount, String category, String description,
                           LocalDateTime createdAt, User user){
        this.id = id;
        this.amount = amount;
        this.category = category;
        this.description = description;
        this.createdAt = createdAt;
        this.user = user;
    }

}
