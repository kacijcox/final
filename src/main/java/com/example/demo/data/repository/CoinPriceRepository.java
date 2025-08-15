package com.example.demo.data.repository;

import com.example.demo.data.model.CoinPrice;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CoinPriceRepository extends JpaRepository<CoinPrice, String> {
}