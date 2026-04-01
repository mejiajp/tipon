package com.tipon.backend.expense.dto;

import com.tipon.backend.category.Category;

import java.math.BigDecimal;

public record ExpenseRequest (
        BigDecimal amount,
        Category category,
        String title
){}
