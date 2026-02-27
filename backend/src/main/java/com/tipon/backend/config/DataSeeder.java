package com.tipon.backend.config;

import com.tipon.backend.expense.Expense;
import com.tipon.backend.expense.ExpenseRepository;
import com.tipon.backend.user.User;
import com.tipon.backend.user.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Random;

@Component
@Profile("dev") // 👈 Only runs in dev mode
public class DataSeeder implements CommandLineRunner {

    private final ExpenseRepository expenseRepository;
    private final UserRepository userRepository;

    public DataSeeder(ExpenseRepository expenseRepository,
                      UserRepository userRepository) {
        this.expenseRepository = expenseRepository;
        this.userRepository = userRepository;
    }

    @Override
    public void run(String... args) {

        // Prevent reseeding every restart
        if (expenseRepository.count() > 0) {
            return;
        }

        // 👇 Replace with your mock user's email
        User mockUser = userRepository.findByEmail("mockuser@test.com")
                .orElseThrow(() -> new RuntimeException("Mock user not found"));

        Random random = new Random();

        // Generate expenses for last 90 days
        for (int day = 0; day < 90; day++) {

            int expensesForDay = random.nextInt(4);
            // 0–3 expenses per day (heatmap variation)

            for (int i = 0; i < expensesForDay; i++) {

                Expense expense = new Expense();
                expense.setUser(mockUser);
                expense.setCategory(getRandomCategory(random));
                expense.setDescription("Seed expense");
                expense.setAmount(
                        BigDecimal.valueOf(random.nextInt(5000) + 100)
                );

                expense.setCreatedAt(
                        LocalDateTime.now()
                                .minusDays(day)
                                .withHour(random.nextInt(23))
                                .withMinute(random.nextInt(59))
                );

                expenseRepository.save(expense);
            }
        }

        System.out.println("✅ Dev seed data inserted successfully.");
    }

    private String getRandomCategory(Random random) {
        String[] categories = {
                "Food",
                "Transport",
                "Shopping",
                "Bills",
                "Entertainment"
        };
        return categories[random.nextInt(categories.length)];
    }
}