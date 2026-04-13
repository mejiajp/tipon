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
import java.util.*;

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
        expense.setTitle(request.title());
        expense.setCreatedAt(LocalDateTime.now());
        expense.setDate(LocalDate.now());
        expense.setUser(currentUser);

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

        YearMonth endYearMonth = YearMonth.of(year, month);
        YearMonth startYearMonth = endYearMonth.minusMonths(5);

        LocalDate startDate = startYearMonth.atDay(1);
        LocalDate endDate = endYearMonth.atEndOfMonth();

        List<Expense> expenses =
                expenseRepository.findByUserAndCreatedAtBetween(
                        currentUser,
                        startDate.atStartOfDay(),
                        endDate.atTime(LocalTime.MAX)
                );

        // Aggregate to Date = Total + Expenses
        Map<LocalDate, BigDecimal> totals = new HashMap<>();
        Map<LocalDate, List<Expense>> expensesByDate = new HashMap<>();

        for (Expense expense : expenses) {
            LocalDate date = expense.getCreatedAt().toLocalDate();
            totals.merge(date, expense.getAmount(), BigDecimal::add);
            expensesByDate
                    .computeIfAbsent(date, k -> new ArrayList<>())
                    .add(expense);
        }

        List<DailyTotalResponse> result = new ArrayList<>();

        LocalDate current = startDate;

        while (!current.isAfter(endDate)) {
            List<ExpenseResponse> dailyExpenses = expensesByDate
                    .getOrDefault(current, Collections.emptyList())
                    .stream()
                    .map(e -> new ExpenseResponse(
                            e.getId(),
                            e.getAmount(),
                            e.getCategory(),
                            e.getTitle(),
                            e.getCreatedAt(),
                            e.getCreatedAt().toLocalDate()
                    ))
                    .toList();

            result.add(new DailyTotalResponse(
                    current,
                    dailyExpenses,
                    totals.getOrDefault(current, BigDecimal.ZERO)
            ));

            current = current.plusDays(1);
        }

        return result;
    }

    public List<ExpenseResponse> getRecentTransactions() {
        User currentUser = currentUserService.getCurrentUser();

        return expenseRepository.findTop3ByUserOrderByCreatedAtDesc(currentUser)
                .stream()
                .map(this::mapToResponse)
                .toList();

    }

    private ExpenseResponse mapToResponse(Expense expense){
        return new ExpenseResponse(
                expense.getId(),
                expense.getAmount(),
                expense.getCategory(),
                expense.getTitle(),
                expense.getCreatedAt(),
                expense.getDate()
        );
    }
}
