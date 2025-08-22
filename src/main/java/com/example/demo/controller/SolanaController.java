package com.example.demo.controller;

import com.example.demo.services.SolanaSwapService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class SolanaController {

    private final SolanaSwapService solanaService;

    public SolanaController(SolanaSwapService solanaService) {
        this.solanaService = solanaService;
    }

    @GetMapping("/transactions")
    public List<String> getTransactions() {
        return solanaService.getRecentTransactions(10);
    }
}
