//package com.tipon.backend.auth;
//
//import jakarta.servlet.http.Cookie;
//import jakarta.servlet.http.HttpServletRequest;
//import jakarta.servlet.http.HttpServletResponse;
//import org.springframework.http.HttpHeaders;
//import org.springframework.http.ResponseCookie;
//import org.springframework.stereotype.Service;
//
//import java.util.UUID;
//
//@Service
//public class AuthCookieService {
//
//    private static final String TOKEN_COOKIE = "token";
//    private static final String DEVICE_COOKIE = "deviceId";
//
//
//
//    public String getOrCreateDeviceId(HttpServletRequest request, HttpServletResponse response) {
//
//        String existingId = getExistingDeviceId(request);
//
//        if (existingId != null) {
//            return existingId;
//        }
//
//        String deviceId = UUID.randomUUID().toString();
//        ResponseCookie deviceCookie = ResponseCookie.from(DEVICE_COOKIE, deviceId)
//                .httpOnly(true)
//                .secure(true)
//                .path("/")
//                .maxAge(60 * 60 * 24 * 365) // 1 year
//                .sameSite("None")
//                .build();
//
//
//        response.addHeader(HttpHeaders.SET_COOKIE, deviceCookie.toString());
//
//        return deviceId;
//    }
//
//    // Used during /auth/me restore check
//    public String getExistingDeviceId(HttpServletRequest request) {
//
//        if (request.getCookies() == null) {
//            return null;
//        }
//
//        for (Cookie cookie : request.getCookies()) {
//            if (DEVICE_COOKIE.equals(cookie.getName())) {
//                return cookie.getValue();
//            }
//        }
//
//        return null;
//    }
//
//
//    public void setTokenCookie(HttpServletResponse response, String token) {
//
//        ResponseCookie tokenCookie = ResponseCookie.from(TOKEN_COOKIE, token)
//                .httpOnly(true)
//                .secure(true)
//                .path("/")
//                .maxAge(60 * 60 * 24)
//                .sameSite("None")
//                .build();
//
//        response.addHeader(HttpHeaders.SET_COOKIE, tokenCookie.toString());
//    }
//
//    public String getTokenCookie(HttpServletRequest request) {
//
//            if (request.getCookies() == null) {
//                return null;
//            }
//
//            for (Cookie cookie: request.getCookies()) {
//                if (TOKEN_COOKIE.equals(cookie.getName())) {
//                return cookie.getValue();
//                }
//            }
//            return null;
//    }
//
//    public void clearTokenCookie(HttpServletResponse response) {
//
//        ResponseCookie tokenCookie = ResponseCookie.from(TOKEN_COOKIE, null)
//                .httpOnly(true)
//                .secure(true)
//                .path("/")
//                .maxAge(0)
//                .sameSite("None")
//                .build();
//
//
//        response.addHeader(HttpHeaders.SET_COOKIE, tokenCookie.toString());
//    }
//
//    public void clearDeviceCookie(HttpServletResponse response) {
//
//        ResponseCookie deviceCookie = ResponseCookie.from(DEVICE_COOKIE, null)
//                .httpOnly(true)
//                .secure(true)
//                .path("/")
//                .maxAge(0)
//                .sameSite("None")
//                .build();
//
//
//        response.addHeader(HttpHeaders.SET_COOKIE, deviceCookie.toString());
//    }
//}
