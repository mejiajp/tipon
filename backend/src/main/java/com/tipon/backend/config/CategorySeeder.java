package com.tipon.backend.config;

import com.tipon.backend.category.Category;
import com.tipon.backend.category.CategoryRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Map;

@Component
public class CategorySeeder implements CommandLineRunner {

    private final CategoryRepository categoryRepository;

    public CategorySeeder(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Override
    public void run(String... args) {

        Map<String, String> categories = Map.ofEntries(
                Map.entry("Housing", "housing"),
                Map.entry("Utilities", "utilities"),
                Map.entry("Food & Dining", "food"),
                Map.entry("Transportation", "transportation"),
                Map.entry("Healthcare", "healthcare"),
                Map.entry("Shopping", "shopping"),
                Map.entry("Entertainment", "entertainment"),
                Map.entry("Education", "education"),
                Map.entry("Travel", "travel"),
                Map.entry("Financial", "financial"),
                Map.entry("Family", "family"),
                Map.entry("Gifts & Donations", "gifts"),
                Map.entry("Subscriptions", "subscriptions"),
                Map.entry("Personal Care", "personal"),
                Map.entry("Pets", "pets"),
                Map.entry("Savings & Investments", "savings"),
                Map.entry("Miscellaneous", "miscellaneous")
        );

        for (var entry : categories.entrySet()) {

            if (!categoryRepository.existsByName(entry.getKey())) {

                Category category = new Category();
                category.setName(entry.getKey());
                category.setSlug(entry.getValue());

                categoryRepository.save(category);
            }
        }

        System.out.println("✅ Default categories seeded successfully.");
    }
}