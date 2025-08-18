package com.example.demo.services;

import com.example.demo.data.model.CoinFavorite;
import com.example.demo.data.repository.CoinFavoriteRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FavoriteService {
    private final CoinFavoriteRepository repo;

    public FavoriteService(CoinFavoriteRepository repo) {
        this.repo = repo;
    }

    public List<CoinFavorite> listbyUser(String userId) {
        return repo.findByUserId(userId);
    }

    public List<CoinFavorite> listByWallet(String walletAddress) {
        return repo.findByWalletAddress(walletAddress);
    }

    @Transactional
    public CoinFavorite addForUser(String userId, String coinId) {
        if (repo.existsByUserIdAndCoinId(userId, coinId)) {
            return repo.findByUserId(userId).stream()
                    .filter(f -> coinId.equals(f.getCoinId()))
                    .findFirst()
                    .orElseGet(() -> repo.save(new CoinFavorite(userId, null, coinId)));
        }
        return repo.save(new CoinFavorite(userId, null, coinId));
    }

    @Transactional
    public CoinFavorite addForWallet(String walletAddress, String coinId) {
        if (repo.existsByWalletAddressAndCoinId(walletAddress, coinId)) {
            return repo.findByWalletAddress(walletAddress).stream()
                    .filter(f -> coinId.equals(f.getCoinId()))
                    .findFirst()
                    .orElseGet(() -> repo.save(new CoinFavorite(null, walletAddress, coinId)));
        }
        return repo.save(new CoinFavorite(null, walletAddress, coinId));
    }

    @Transactional
    public void removeForUser(String userId, String coinId) {
        repo.deleteByUserIdAndCoinId(userId, coinId);
    }

    @Transactional
    public void removeForWallet(String walletAddress, String coinId) {
        repo.deleteByWalletAddressAndCoinId(walletAddress, coinId);
    }
}
