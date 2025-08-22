package com.example.demo.controller;


import com.example.demo.data.model.User;
import com.example.demo.data.model.UserSession;
import com.example.demo.data.repository.UserRepository;
import com.example.demo.data.repository.UserSessionRepository;
import com.example.demo.dto.AuthRequest;
import com.example.demo.dto.AuthResponse;
import com.example.demo.services.EmailService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;

import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})

public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private EmailService emailService;

    @Autowired
    private UserSessionRepository userSessionRepository;


    // user registration
    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody @Valid AuthRequest request) {
        try {
            //checks if email already exists, if it does, returns an error
            if (userRepository.existsByUserName(request.getUserName())) {
                return ResponseEntity.badRequest().body("Email Already Exists");
            }
            //if email does not exist, a new user is created
            User user = new User(
                    request.getUserName(),
                    passwordEncoder.encode(request.getPassword())
            );
            //save user to db
            userRepository.save(user);

            //send confirmation email to new user
            try {
                String subject = "Registration Confirmation";
                String body = "Welcome to Hedge Hog!\n\nThank you for registering. Your account has been created successfully.";
                //java email service to send confirmation email
                emailService.sendConfirmationEmail(request.getUserName(), subject, body);
                //error handling if user registered but email was unable to be sent
            } catch (Exception e) {
                e.printStackTrace();
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body("User registered but failed to send confirmation email.");
            }

            //if user was successfully registered, return a success message
            return ResponseEntity.ok("User registered successfully. Please check your email for confirmation.");
        } catch (Exception e) {
            e.printStackTrace(); // For debugging
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred during user registration.");
        }
    }

    //login logic
    @PostMapping("/login")
    //response entity wildcard for returning different types of responses
    public ResponseEntity<?> login(@RequestBody AuthRequest request) {
        Optional<User> user = userRepository.findByUserName(request.getUserName());
        //if the user exists, check if the password matches
        if (user.isPresent() &&
                passwordEncoder.matches(request.getPassword(), user.get().getPassword())) {
            //if the password matches, generate a token and return it
            String token = generateSimpleToken(request.getUserName());
            User.Role role = user.get().getRole();
            return ResponseEntity.ok(new AuthResponse(token, request.getUserName(), role));
        }

        return ResponseEntity.badRequest().body("Invalid Credentials");
    }

    @PostMapping("/phantom-login")
    public ResponseEntity<?> phantomLogin(@RequestBody Map<String, String> request,
                                          @RequestHeader(value = "User-Agent", required = false) String userAgent,
                                          HttpServletRequest httpRequest) {
        try {
            String walletAddress = request.get("walletAddress");

            if (walletAddress == null || walletAddress.trim().isEmpty()) {
                return ResponseEntity.badRequest().body("Wallet address is required");
            }

            //generate a token for wallet auth
            String token = generateSimpleToken(walletAddress);

            //create a user session for wallet auth
            String sessionTokenHash = UUID.randomUUID().toString();
            UserSession session = new UserSession(sessionTokenHash, walletAddress);
            session.setIpAddress(httpRequest.getRemoteAddr());
            session.setUserAgent(userAgent);

            //save the session
            userSessionRepository.save(session);

            return ResponseEntity.ok(new AuthResponse(token, walletAddress, User.Role.USER));

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error during phantom wallet authentication: " + e.getMessage());
        }
    }

    //generate a token and combine username to generated a unique token
    private String generateSimpleToken(String username) {
        return "token_" + username + "_" + System.currentTimeMillis();
    }
}
