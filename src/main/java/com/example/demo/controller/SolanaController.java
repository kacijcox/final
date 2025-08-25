package com.example.demo.controller;

import com.example.demo.services.SolanaSwapService;
import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SolanaController {

    private final SolanaSwapService solanaService;

    public SolanaController(SolanaSwapService solanaService) {
        this.solanaService = solanaService;
    }

    @GetMapping(value = "/token-balances", produces = "application/json")
    public JsonNode getTokenBalances(@RequestParam("walletAddress") String walletAddress) {
        return solanaService.getAccountInfo(walletAddress);
    }
}