package com.tipon.backend.expense.dto;


import com.tipon.backend.category.Category;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;



public record ExpenseResponse (
    UUID id,
    BigDecimal amount,
    Category category,
    String title,
    LocalDateTime createdAt,
    LocalDate date
){}
