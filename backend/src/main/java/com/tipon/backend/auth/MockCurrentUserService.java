package com.tipon.backend.auth;

import com.tipon.backend.user.AuthProvider;
import com.tipon.backend.user.User;
import com.tipon.backend.user.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

//Returns test/guest user for now
@Service
public class MockCurrentUserService implements CurrentUserService {

    private final UserRepository userRepository;

    public MockCurrentUserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User getCurrentUser(){
        // try to find a test user first
        String testEmail = "test@tipon.local";

        return userRepository.findByEmail(testEmail)
                .orElseGet(()-> {
                    // If none exists, create one
                    User guestUser = new User();
                    guestUser.setEmail(testEmail);
                    guestUser.setProvider(AuthProvider.GUEST);
                    guestUser.setCreatedAt(LocalDate.now());

                    return userRepository.save(guestUser);
                });
    }
}
