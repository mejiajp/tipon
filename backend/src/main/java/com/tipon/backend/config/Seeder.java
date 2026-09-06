package com.tipon.backend.config;

import com.tipon.backend.category.Category;
import com.tipon.backend.category.CategoryRepository;
import com.tipon.backend.expense.Expense;
import com.tipon.backend.expense.ExpenseRepository;
import com.tipon.backend.user.User;
import com.tipon.backend.user.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Component
@Profile("dev")
public class Seeder implements CommandLineRunner {

    private static final String GUEST_USER_NAME = "Guest User";

    private final ExpenseRepository expenseRepository;
    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;

    public Seeder(
            ExpenseRepository expenseRepository,
            UserRepository userRepository,
            CategoryRepository categoryRepository
    ) {
        this.expenseRepository = expenseRepository;
        this.userRepository = userRepository;
        this.categoryRepository = categoryRepository;
    }

    @Override
    public void run(String... args) {

        // Prevent reseeding expenses every restart
        if (expenseRepository.count() > 0) {
            return;
        }

        User guestUser = userRepository
                .findByName(GUEST_USER_NAME)
                .orElse(null);

        if (guestUser == null) {
            System.out.println(
                    "⚠️ Guest user '" + GUEST_USER_NAME + "' not found. Skipping expense seed."
            );
            return;
        }

        List<Category> categories = categoryRepository.findAll();

        if (categories.isEmpty()) {
            return;
        }

        Random random = new Random();

        String[] sampleDescriptions = {
                "Coffee",
                "Groceries",
                "Movie ticket",
                "Bus fare",
                "Electricity bill",
                "Lunch",
                "Book purchase",
                "Gym membership",
                "Insurance premium",
                "Flight ticket",
                "Gift",
                "Online subscription"
        };

        List<Expense> expenses = new ArrayList<>();

        for (int day = 0; day < 90; day++) {

            int expensesForDay = random.nextInt(4);

            for (int i = 0; i < expensesForDay; i++) {

                Expense expense = new Expense();

                expense.setUser(guestUser);

                expense.setCategory(
                        categories.get(
                                random.nextInt(categories.size())
                        )
                );

                expense.setTitle(
                        sampleDescriptions[
                                random.nextInt(sampleDescriptions.length)
                                ]
                );

                expense.setAmount(
                        BigDecimal.valueOf(
                                random.nextInt(5000) + 100
                        )
                );

                expense.setCreatedAt(
                        LocalDateTime.now()
                                .minusDays(day)
                                .withHour(random.nextInt(24))
                                .withMinute(random.nextInt(60))
                );

                expense.setDate(
                        LocalDate.now().minusDays(day)
                );

                expenses.add(expense);
            }
        }

        expenseRepository.saveAll(expenses);

        System.out.println(
                "✅ Dev expense seed data inserted successfully for "
                        + GUEST_USER_NAME
        );
    }
}