package com.tipon.backend.expense;


import com.tipon.backend.auth.CurrentUserService;
import com.tipon.backend.expense.dto.ExpenseRequest;
import com.tipon.backend.expense.dto.ExpenseResponse;
import com.tipon.backend.user.User;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

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

    private ExpenseResponse mapToResponse(Expense expense){
        return new ExpenseResponse(
                expense.getId(),
                expense.getAmount(),
                expense.getCategory(),
                expense.getDescription(),
                expense.getCreatedAt()
        );
    }
}
