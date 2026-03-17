package com.tipon.backend.auth;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class AuthCookieService {

    private static final String TOKEN_COOKIE = "token";
    private static final String DEVICE_COOKIE = "deviceId";


    public String getOrCreateDeviceId(HttpServletRequest request, HttpServletResponse response) {

        // if exist return
        if (request.getCookies() != null) {
            for (Cookie cookie: request.getCookies()) {
                if (DEVICE_COOKIE.equals(cookie.getName())) {
                    return cookie.getValue();
                }
            }
        }

        // if not create a new one
        String deviceId = UUID.randomUUID().toString();

        Cookie deviceCookie = new Cookie(DEVICE_COOKIE, deviceId);
        deviceCookie.setHttpOnly(false);
        deviceCookie.setPath("/");
        deviceCookie.setMaxAge(60 * 60 * 24 * 365); // 1 year

        response.addCookie(deviceCookie);

        return deviceId;
    }

    public void setTokenCookie(HttpServletResponse response, String token) {

        Cookie tokenCookie = new Cookie(TOKEN_COOKIE, token);
        tokenCookie.setHttpOnly(true);
        tokenCookie.setPath("/");
        tokenCookie.setMaxAge(60 * 60 * 24);

        //tokenCookie.setSecure(true); // https for production

        response.addCookie(tokenCookie);
    }

    public String getTokenCookie(HttpServletRequest request) {

            if (request.getCookies() == null) {
                return null;
            }

            for (Cookie cookie: request.getCookies()) {
                if (TOKEN_COOKIE.equals(cookie.getName())) {
                return cookie.getValue();
                }
            }
            return null;
    }

    public void clearTokenCookie(HttpServletResponse response) {
        
        Cookie cookie = new Cookie(TOKEN_COOKIE, null);
        cookie.setPath("/");
        cookie.setMaxAge(0);

        response.addCookie(cookie);

    }
}
