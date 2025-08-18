package com.example.demo.data.repository;

import com.example.demo.data.model.CoinFavorite;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CoinFavoriteRepository extends JpaRepository<CoinFavorite, Long> {
    List<CoinFavorite> findByUserId(String userId);
    List<CoinFavorite> findByWalletAddress(String walletAddress);

    boolean existsByUserIdAndCoinId(String userId, String coinId);
    boolean existsByWalletAddressAndCoinId(String walletAddress, String coinId);

    void deleteByUserIdAndCoinId(String userId, String coinId);
    void deleteByWalletAddressAndCoinId(String walletAddress, String coinId);
}