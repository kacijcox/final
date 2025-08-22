package com.example.demo.dto;

import com.example.demo.data.model.User;

public class AuthResponse {
    private String token;
    private String username;
    private User.Role role;

    public AuthResponse(String token, String username, User.Role role) {
        this.token = token;
        this.username = username;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}