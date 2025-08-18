package com.example.demo.controller;

import com.example.demo.data.model.CoinFavorite;
import com.example.demo.services.FavoriteService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;



@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/favorites")

public class FavoriteController {
    private final FavoriteService service;

    public FavoriteController(FavoriteService service) {
        this.service = service;
    }

    //list the favorites by user id
    @GetMapping("/user/{userId}")
    public List<CoinFavorite> listByUser(@PathVariable String userId) {
        return service.listbyUser(userId);
    }

    //list by wallet address
    @GetMapping("/wallet/{walletAddress}")
    public List<CoinFavorite> listByWallet(@PathVariable String walletAddress) {
        return service.listByWallet(walletAddress);
    }

    //add favorite for user
    @PostMapping("/favorites-user")
    public ResponseEntity<CoinFavorite> addForUser(@RequestBody Map<String, String> body) {
        String userId = body.get("userId");
        String coinId = body.get("coinId");
        return ResponseEntity.ok(service.addForUser(userId, coinId));
    }

    @PostMapping("/favorites-wallet")
    public ResponseEntity<CoinFavorite> addForWallet(@RequestBody Map<String, String> body) {
        String walletAddress = body.get("walletAddress");
        String coinId = body.get("coinId");
        return ResponseEntity.ok(service.addForWallet(walletAddress, coinId));
    }

    //remove a favorite for user
    @DeleteMapping("/user/{userId}/{coinId}")
    public ResponseEntity<Void> removeForUser(@PathVariable String userId, @PathVariable String coinId) {
        service.removeForUser(userId, coinId);
        return ResponseEntity.noContent().build();
    }

    //remove a favorite for wallet
    @DeleteMapping("/wallet/{walletAddress}/{coinId}")
    public ResponseEntity<Void> removeForWallet(@PathVariable String walletAddress, @PathVariable String coinId) {
        service.removeForWallet(walletAddress, coinId);
        return ResponseEntity.noContent().build();
    }
}