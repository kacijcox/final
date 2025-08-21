package com.example.demo.controller;

import com.example.demo.data.model.PhantomWallet;
import com.example.demo.data.model.UserSession;
import com.example.demo.data.repository.PhantomWalletRepository;
import com.example.demo.data.repository.UserSessionRepository;
import com.example.demo.services.PhantomWalletService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;
import java.util.UUID;


@RestController
@RequestMapping("/api/phantom")
public class PhantomWalletController {
    //link phantom wallet service to controller
    @Autowired
    private PhantomWalletService phantomWalletService;

    @Autowired
    private PhantomWalletRepository phantomWalletRepository;

    @Autowired
    private UserSessionRepository userSessionRepository;

    //connect wallet to user account. wildcard for path variable to return different wallets based on wallet address
    @PostMapping("/connect")
    @Transactional
    public ResponseEntity<?> connectWallet(@RequestBody Map<String, String> request,
                                           @RequestHeader(value = "User-Agent", required = false) String userAgent,
                                           HttpServletRequest httpRequest) {
        String walletAddress = request.get("walletAddress");

        Optional<PhantomWallet> existing = phantomWalletService.findByWalletAddress(walletAddress);


        PhantomWallet wallet;
        if (existing.isPresent()) {
            wallet = existing.get();
        } else {
            PhantomWallet newWallet = new PhantomWallet(walletAddress);
            wallet = phantomWalletService.save(newWallet);
    }

    // Always create a session for every connection (new or existing)
    String tokenHash = UUID.randomUUID().toString();
    UserSession session = new UserSession(tokenHash, wallet.getWalletAddress());
    session.setIpAddress(httpRequest.getRemoteAddr());
    session.setUserAgent(userAgent);
    return ResponseEntity.ok(wallet);
}

    //get user wallet address to
    @GetMapping("/wallet/{address}")
    public ResponseEntity<?> getWallet(@PathVariable String address) {
        Optional<PhantomWallet> wallet = phantomWalletService.findByWalletAddress(address);
        if (wallet.isPresent()) {
            return ResponseEntity.ok(wallet.get());
        }
        return ResponseEntity.notFound().build();
    }
}