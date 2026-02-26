package com.tipon.backend.expense;




import com.tipon.backend.expense.dto.DailyTotalResponse;
import com.tipon.backend.expense.dto.ExpenseRequest;
import com.tipon.backend.expense.dto.ExpenseResponse;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/expenses")
public class ExpenseController {

    private final ExpenseService expenseService;

    public ExpenseController(ExpenseService expenseService){
        this.expenseService = expenseService;
    }

    // Get All
    @GetMapping
    public List<ExpenseResponse> getExpenses(){
        return expenseService.getAllExpenses();
    }

    // Add One
    @PostMapping
    public ExpenseResponse createExpense(@RequestBody ExpenseRequest expense){
        return expenseService.addExpense(expense);
    }

    //Date Range
    @GetMapping
    public List<ExpenseResponse> getByRange(
            @RequestParam String start,
            @RequestParam String end
    ) {
        return expenseService.getExpensesByRange(
                LocalDate.parse(start),
                LocalDate.parse(end)
        );
    }

    // Monthly Calendar
    @GetMapping("/calendar")
    public List<DailyTotalResponse> getCalendar(
            @RequestParam int year,
            @RequestParam int month
    ) {
        return expenseService.getMonthlyCalendar(year, month);
    }
}
