package com.tipon.backend.expense;


import com.tipon.backend.auth.CurrentUserService;
import com.tipon.backend.expense.dto.DailyTotalResponse;
import com.tipon.backend.expense.dto.ExpenseRequest;
import com.tipon.backend.expense.dto.ExpenseResponse;
import com.tipon.backend.user.User;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.YearMonth;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ExpenseService {

    private final ExpenseRepository expenseRepository;

    private final CurrentUserService currentUserService;

    public ExpenseService(ExpenseRepository expenseRepository,
                          CurrentUserService currentUserService){
        this.expenseRepository = expenseRepository;
        this.currentUserService = currentUserService;
    }

    // GET
    public List<ExpenseResponse> getAllExpenses(){

        User currentUser = currentUserService.getCurrentUser(); // MOCK USER

        return expenseRepository.findByUser(currentUser)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    // POST
    public ExpenseResponse addExpense(ExpenseRequest request) {

        User currentUser = currentUserService.getCurrentUser(); // MOCK USER

        Expense expense = new Expense();

        expense.setAmount(request.amount());
        expense.setCategory(request.category());
        expense.setDescription(request.description());
        expense.setCreatedAt(LocalDateTime.now());
        expense.setUser(currentUser); // MOCK USER

        Expense saved = expenseRepository.save(expense);

        return mapToResponse(saved);
    }

    // Date Filter
    public List<ExpenseResponse> getExpensesByRange(
            LocalDate start,
            LocalDate end
    ){
        User currentUser = currentUserService.getCurrentUser();

        List<Expense> expenses =
                expenseRepository.findByUserAndCreatedAtBetween(
                        currentUser,
                        start.atStartOfDay(),
                        end.atTime(LocalTime.MAX));

        return expenses.stream()
                .map(this::mapToResponse)
                .toList();
    }


    // Monthly Calendar
    public List<DailyTotalResponse> getMonthlyCalendar(
            int year,
            int month
    ){
        User currentUser = currentUserService.getCurrentUser();

        YearMonth yearMonth = YearMonth.of(year,month);

        LocalDate startDate = yearMonth.atDay(1);
        LocalDate endDate = yearMonth.atEndOfMonth();

        // Fetch Expenses for the Month
        List<Expense> expenses =
                expenseRepository.findByUserAndCreatedAtBetween(
                        currentUser,
                        startDate.atStartOfDay(),
                        endDate.atTime(LocalTime.MAX)
                );

        // Aggregate to Date = Total
        Map<LocalDate, BigDecimal> totals = new HashMap<>();

        for (Expense expense : expenses) {
            LocalDate date = expense.getCreatedAt().toLocalDate();

            totals.merge(
                    date,
                    expense.getAmount(),
                    BigDecimal::add
            );
        }

            List<DailyTotalResponse> result = new ArrayList<>();

            LocalDate current = startDate;

            while (!current.isAfter(endDate)) {
                result.add(new DailyTotalResponse(
                        current,
                        totals.getOrDefault(current, BigDecimal.ZERO)
                ));

                current = current.plusDays(1);
        }
            return result;
    }

    private ExpenseResponse mapToResponse(Expense expense){
        return new ExpenseResponse(
                expense.getId(),
                expense.getAmount(),
                expense.getCategory(),
                expense.getDescription(),
                expense.getCreatedAt(),
                expense.getDate()
        );
    }
}
