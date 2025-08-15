package com.example.demo.data.model;

import jakarta.persistence.*;

@Entity
@Table(name = "user")
public class User {
    @Id
    @Column(name = "user_id")
    private String userName;

    @Column(name = "password_hash", columnDefinition = "TEXT")
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(name = "user_role", nullable = false)
    private Role role = Role.USER; // Set default value

    public User() {
    }

    public User(String userName, String password, Role role) {
        this.userName = userName;
        this.password = password;
        this.role = role;
    }

    public User(String userName, String password) {
        this.userName = userName;
        this.password = password;
        this.role = Role.USER; // Set default role
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public enum Role {
        USER
    }
}