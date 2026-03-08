package com.tipon.backend.auth;


import com.tipon.backend.device.Device;
import com.tipon.backend.device.DeviceRepository;
import com.tipon.backend.user.AuthProvider;
import com.tipon.backend.user.User;
import com.tipon.backend.user.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Optional;
import java.util.UUID;

@Service
public class CurrentUserService {

    private final UserRepository userRepository;

    private final JwtService jwtService;

    private final DeviceRepository deviceRepository;

    public CurrentUserService(UserRepository userRepository, JwtService tokenService, DeviceRepository deviceRepository) {
        this.userRepository = userRepository;
        this.jwtService = tokenService;
        this.deviceRepository = deviceRepository;
    }

    // Get existing guest or create a new one using deviceId
    public User getOrCreateGuest(UUID deviceId) {
        Optional<Device> existingDevice = deviceRepository.findByDeviceId(deviceId);

        if (existingDevice.isPresent()) {
            return existingDevice.get().getUser();
        }

        // else Create new guest user
        User guest = new User();
        guest.setEmail(null);
        guest.setProvider(AuthProvider.GUEST);
        guest.setCreatedAt(LocalDate.now());

        // Save user first
        User savedUser = userRepository.save(guest);

        // Attach the device
        Device device = new Device();
        device.setDeviceId(deviceId);
        device.setUser(savedUser);

        // Save device
        deviceRepository.save(device);

        return savedUser; // Can be a dto later
    }

    public String generateToken(User user) {
        return jwtService.generateToken(user);
    }


    public User getCurrentUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        if (auth == null || !(auth.getPrincipal() instanceof User)) {
            throw new RuntimeException("No authenticated user found");
        }

        return (User) auth.getPrincipal();
    }
}
