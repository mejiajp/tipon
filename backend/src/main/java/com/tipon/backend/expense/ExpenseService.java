package com.tipon.backend.repository;

import com.tipon.backend.model.Expense;
import com.tipon.backend.expense.ExpenseRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExpenseService {

    private final ExpenseRepository repo;

    public ExpenseService(ExpenseRepository repo){
        this.repo = repo;
    }

    public List<Expense> getAllExpenses(){
        return repo.findAll();
    }

    public Expense addExpense(Expense expense) {
        return repo.save(expense);
    }
}
