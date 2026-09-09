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
import java.util.Map;
import java.util.Random;

@Component
@Profile("dev")
public class Seeder implements CommandLineRunner {

    private static final String GUEST_USER_NAME = "Juan";

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
            System.out.println("Expense record exists.");
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
            System.out.println("⚠️ No categories found. Skipping expense seed.");
            return;
        }

        Map<String, Category> categoryMap = categories.stream()
                .collect(
                        java.util.stream.Collectors.toMap(
                                Category::getName,
                                category -> category
                        )
                );

        Map<String, String[]> expensesByCategory = Map.ofEntries(
                Map.entry("Housing", new String[]{
                        "Rent",
                        "Apartment maintenance",
                        "Home supplies"
                }),
                Map.entry("Utilities", new String[]{
                        "Electricity bill",
                        "Water bill",
                        "Internet bill",
                        "Phone bill"
                }),
                Map.entry("Food & Dining", new String[]{
                        "Coffee",
                        "Groceries",
                        "Lunch",
                        "Dinner",
                        "Fast food"
                }),
                Map.entry("Transportation", new String[]{
                        "Bus fare",
                        "Taxi",
                        "Gas",
                        "Train fare",
                        "Parking"
                }),
                Map.entry("Healthcare", new String[]{
                        "Medicine",
                        "Doctor visit",
                        "Pharmacy"
                }),
                Map.entry("Shopping", new String[]{
                        "Clothes",
                        "Shoes",
                        "Electronics",
                        "Home supplies"
                }),
                Map.entry("Entertainment", new String[]{
                        "Movie ticket",
                        "Concert",
                        "Games",
                        "Hobby"
                }),
                Map.entry("Education", new String[]{
                        "Book purchase",
                        "Online course",
                        "School supplies"
                }),
                Map.entry("Travel", new String[]{
                        "Flight ticket",
                        "Hotel",
                        "Travel expenses"
                }),
                Map.entry("Financial", new String[]{
                        "Bank fee",
                        "Loan payment",
                        "Credit card payment"
                }),
                Map.entry("Family", new String[]{
                        "Family dinner",
                        "Allowance",
                        "Family expenses"
                }),
                Map.entry("Gifts & Donations", new String[]{
                        "Gift",
                        "Donation",
                        "Birthday gift"
                }),
                Map.entry("Subscriptions", new String[]{
                        "Netflix",
                        "Spotify",
                        "Cloud storage"
                }),
                Map.entry("Personal Care", new String[]{
                        "Haircut",
                        "Skincare",
                        "Personal care"
                }),
                Map.entry("Pets", new String[]{
                        "Pet food",
                        "Vet visit",
                        "Pet supplies"
                }),
                Map.entry("Savings & Investments", new String[]{
                        "Savings",
                        "Investment",
                        "Emergency fund"
                }),
                Map.entry("Miscellaneous", new String[]{
                        "Miscellaneous expense",
                        "Other expense"
                })
        );

        Random random = new Random();
        List<Expense> expenses = new ArrayList<>();

        for (int day = 0; day < 90; day++) {

            int expensesForDay = random.nextInt(4);

            for (int i = 0; i < expensesForDay; i++) {

                // Pick a category that actually exists
                List<String> availableCategories = expensesByCategory.keySet()
                        .stream()
                        .filter(categoryMap::containsKey)
                        .toList();

                if (availableCategories.isEmpty()) {
                    continue;
                }

                String categoryName = availableCategories.get(
                        random.nextInt(availableCategories.size())
                );

                Category category = categoryMap.get(categoryName);

                String[] descriptions = expensesByCategory.get(categoryName);

                Expense expense = new Expense();

                expense.setUser(guestUser);
                expense.setCategory(category);

                expense.setTitle(
                        descriptions[
                                random.nextInt(descriptions.length)
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