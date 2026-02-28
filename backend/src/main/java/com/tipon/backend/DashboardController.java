package com.tipon.backend;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DashboardController {

    @GetMapping("/api")
    public String index(){
        return "Hello from Spring Boot";
    }
}
