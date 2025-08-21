package com.example.demo.controller;

import com.example.demo.data.model.UserSession;
import com.example.demo.data.repository.UserSessionRepository;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/user-sessions")

public class UserSessionController {

    private final UserSessionRepository userSessionRepository;

    public UserSessionController(UserSessionRepository userSessionRepository) {
        this.userSessionRepository = userSessionRepository;
    }

    @PostMapping
    public ResponseEntity<?> create (@RequestBody Map<String, String> body,
                                     @RequestHeader(value = "User-Agent", required = false) String userAgent,
                                     HttpServletRequest request) {
        String tokenHash = body.get("sessionTokenHash");
        String wallet = body.get("walletAddress");
        String userId = body.get("userId");

        UserSession s = new UserSession(tokenHash, wallet);
        s.setUserId(userId);
        s.setUserAgent(userAgent);
        s.setIpAddress(request.getRemoteAddr());

        UserSession saved = userSessionRepository.save(s);
        return ResponseEntity.status(201).body(saved);
    }

    @PostMapping("/{tokenHash}/touch")
public ResponseEntity<?> touch (@PathVariable String tokenHash,
                                @RequestHeader(value = "User-Agent",required = false) String userAgent,
                                HttpServletRequest request) {
        String ip = request.getRemoteAddr();
        int updated = userSessionRepository.touch(tokenHash, ip, userAgent);
        return ResponseEntity.ok(updated);}
}

