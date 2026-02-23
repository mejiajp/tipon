package com.tipon.backend.expense.dto;

import java.math.BigDecimal;

public record ExpenseRequest (
        BigDecimal amount,
        String category,
        String description
){}
