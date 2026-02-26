package com.tipon.backend.expense;

import com.tipon.backend.expense.Expense;
import com.tipon.backend.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

public interface ExpenseRepository extends JpaRepository<Expense, UUID>{
    List<Expense> findByUser(User user);

    List<Expense> findByUserandCreatedAtBetween(User currentUser,
                                                LocalDateTime localDateTime,
                                                LocalDateTime localDateTime1);
}
