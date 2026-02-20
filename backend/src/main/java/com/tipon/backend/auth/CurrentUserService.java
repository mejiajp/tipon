package com.tipon.backend.auth;


import com.tipon.backend.user.User;

public interface CurrentUserService {
    User getCurrentUser();
}
