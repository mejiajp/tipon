package com.tipon.backend.expense.dto;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public record DailyTotalResponse (
        LocalDate date,
        List<ExpenseResponse> expense,
        BigDecimal total
){}
