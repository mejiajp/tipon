package com.tipon.backend.expense.dto;


import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;



public record ExpenseResponse (
    UUID id,
    BigDecimal amount,
    String category,
    String description,
    LocalDateTime createdAt,
    LocalDate date
){}
