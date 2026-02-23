package com.tipon.backend.expense;



import com.tipon.backend.expense.dto.ExpenseRequest;
import com.tipon.backend.expense.dto.ExpenseResponse;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/expenses")
public class ExpenseController {

    private final ExpenseService service;

    public ExpenseController(ExpenseService service){
        this.service = service;
    }

    @GetMapping
    public List<ExpenseResponse> getExpenses(){
        return service.getAllExpenses();
    }

    @PostMapping
    public ExpenseResponse createExpense(@RequestBody ExpenseRequest expense){
        return service.addExpense(expense);
    }
}
