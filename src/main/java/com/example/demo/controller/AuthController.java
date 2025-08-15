package com.example.demo.controller;


import com.example.demo.data.model.User;
import com.example.demo.data.repository.UserRepository;
import com.example.demo.dto.AuthRequest;
import com.example.demo.dto.AuthResponse;
import com.example.demo.services.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")

public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private EmailService emailService;


@PostMapping("/register")
public ResponseEntity<String> register(@RequestBody @Valid AuthRequest request) {
    try {
        if (userRepository.existsByUserName(request.getUserName())) {
            return ResponseEntity.badRequest().body("Email Already Exists");
        }

        User user = new User(
            request.getUserName(),
            passwordEncoder.encode(request.getPassword())
        );
        userRepository.save(user);

        try {
            String subject = "Registration Confirmation";
            String body = "Welcome to our application!\n\nThank you for registering. Your account has been created successfully.";
            emailService.sendConfirmationEmail(request.getUserName(), subject, body);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("User registered but failed to send confirmation email.");
        }

        return ResponseEntity.ok("User registered successfully. Please check your email for confirmation.");
    } catch (Exception e) {
        e.printStackTrace(); // For debugging
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred during user registration.");
    }
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