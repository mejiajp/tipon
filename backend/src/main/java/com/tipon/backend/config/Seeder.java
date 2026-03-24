package com.tipon.backend.config;

import com.tipon.backend.category.Category;
import com.tipon.backend.category.CategoryRepository;
import com.tipon.backend.expense.Expense;
import com.tipon.backend.expense.ExpenseRepository;
import com.tipon.backend.user.AuthProvider;
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
@Profile("dev") // Only runs in dev mode
public class Seeder implements CommandLineRunner {

    private final ExpenseRepository expenseRepository;
    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;

    public Seeder(ExpenseRepository expenseRepository,
                  UserRepository userRepository,
                  CategoryRepository categoryRepository) {
        this.expenseRepository = expenseRepository;
        this.userRepository = userRepository;
        this.categoryRepository = categoryRepository;
    }

    @Override
    public void run(String... args) {

        // Prevent reseeding every restart
        if (expenseRepository.count() > 0) {
            return;
        }

        // Find an existing guest user
        User guestUser = userRepository
                .findFirstByProvider(AuthProvider.GUEST)
                .orElse(null);

        if (guestUser == null) {
            return;
        }

        // Seed categories if they don't exist
        List<String> categoryNames = List.of(
                "Housing", "Utilities", "Food & Dining", "Transportation",
                "Healthcare", "Insurance", "Shopping", "Entertainment",
                "Education", "Travel", "Financial", "Family",
                "Gifts & Donations", "Subscriptions", "Personal Care",
                "Pets", "Savings & Investments", "Miscellaneous"
        );

        for (String name : categoryNames) {
            if (!categoryRepository.existsByName(name)) {
                categoryRepository.save(new Category(name));
            }
        }

        // Load all categories once
        List<Category> categories = categoryRepository.findAll();

        Random random = new Random();

        // Sample descriptions for more realistic seed data
        String[] sampleDescriptions = {
                "Coffee", "Groceries", "Movie ticket", "Bus fare",
                "Electricity bill", "Lunch", "Book purchase", "Gym membership",
                "Insurance premium", "Flight ticket", "Gift", "Online subscription"
        };

        List<Expense> allExpenses = new ArrayList<>();

        // Generate expenses for the last 90 days
        for (int day = 0; day < 90; day++) {

            int expensesForDay = random.nextInt(4); // 0–3 expenses per day

            for (int i = 0; i < expensesForDay; i++) {

                Expense expense = new Expense();
                expense.setUser(guestUser);
                expense.setCategory(categories.get(random.nextInt(categories.size())));
                expense.setDescription(sampleDescriptions[random.nextInt(sampleDescriptions.length)]);
                expense.setAmount(BigDecimal.valueOf(random.nextInt(5000) + 100));

                LocalDateTime createdAt = LocalDateTime.now()
                        .minusDays(day)
                        .withHour(random.nextInt(24))
                        .withMinute(random.nextInt(60));
                expense.setCreatedAt(createdAt);

                expense.setDate(LocalDate.now().minusDays(day));

                allExpenses.add(expense);
            }
        }

        // Batch save all expenses at once
        expenseRepository.saveAll(allExpenses);

        System.out.println("✅ Dev seed data inserted successfully.");
    }
}