package com.example.demo.controller;

import com.example.demo.data.model.PhantomWallet;
import com.example.demo.services.PhantomWalletService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/phantom")
public class PhantomWalletController {
    //link phantom wallet service to controller
    @Autowired
    private PhantomWalletService phantomWalletService;
    //connect wallet to user account. wildcard for path variable to return different wallets based on wallet address
    @PostMapping("/connect")
    public ResponseEntity<?> connectWallet(@RequestBody Map<String, String> request) {
        String walletAddress = request.get("walletAddress");

        Optional<PhantomWallet> existing = phantomWalletService.findByWalletAddress(walletAddress);

        if (existing.isPresent()) {
            return ResponseEntity.ok(existing.get());
        } else {
            PhantomWallet newWallet = new PhantomWallet(walletAddress);
            PhantomWallet saved = phantomWalletService.save(newWallet);
            return ResponseEntity.ok(saved);
        }
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