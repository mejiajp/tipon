package com.tipon.backend.expense.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

public record DailyTotalResponse (
        LocalDate time,
        BigDecimal total
){}
