package com.example.demo.controller;


import com.example.demo.data.model.User;
import com.example.demo.data.repository.UserRepository;
import com.example.demo.dto.AuthRequest;
import com.example.demo.dto.AuthResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")

public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody AuthRequest request) {
        if (userRepository.existsByUserName(request.getUserName())) {
            return ResponseEntity.badRequest().body("Username Already Exists");
        }
        User user = new User(
                request.getUserName(),
                passwordEncoder.encode(request.getPassword())
        );
        userRepository.save(user);
        return ResponseEntity.ok("User Registered");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest request) {
        Optional<User> user = userRepository.findByUserName(request.getUserName());

        if (user.isPresent() &&
                passwordEncoder.matches(request.getPassword(), user.get().getPassword())) {

            String token = generateSimpleToken(request.getUserName());
            return ResponseEntity.ok(new AuthResponse(token, request.getUserName()));
        }

        return ResponseEntity.badRequest().body("Invalid Credentials");
    }

    private String generateSimpleToken(String username) {
        return "token_" + username + "_" + System.currentTimeMillis();
    }
}
