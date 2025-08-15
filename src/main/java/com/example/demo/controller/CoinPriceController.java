package com.example.demo.controller;


import com.example.demo.data.model.CoinPrice;
import com.example.demo.data.repository.CoinPriceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/coin-price")

public class CoinPriceController {
    @Autowired
    CoinPriceRepository coinPriceRepository;

    @GetMapping()
    public ResponseEntity<List<CoinPrice>> getCoinPrice() {
        List<CoinPrice> coinPrice = coinPriceRepository.findAll();
        return ResponseEntity.ok(coinPrice);
    }

    @GetMapping("/{coinId}")
    public ResponseEntity<CoinPrice> getCoinPrice(@PathVariable String coinId) {
        Optional<CoinPrice> coinPriceOptional = coinPriceRepository.findById(coinId);
        if (coinPriceOptional.isPresent()) {
            return ResponseEntity.ok(coinPriceOptional.get());
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @PostMapping
    public ResponseEntity<CoinPrice> addItem(@RequestBody CoinPrice coinPrice) {
        coinPrice.setCoinUsd(0);
        coinPrice = coinPriceRepository.saveAndFlush(coinPrice);
        return ResponseEntity.status(HttpStatus.CREATED).body(coinPrice);
    }
}
