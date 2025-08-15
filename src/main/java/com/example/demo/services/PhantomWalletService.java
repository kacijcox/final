package com.example.demo.services;

import com.example.demo.data.model.PhantomWallet;
import com.example.demo.data.repository.PhantomWalletRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PhantomWalletService {

    @Autowired
    private PhantomWalletRepository phantomWalletRepository;

    public PhantomWallet save(PhantomWallet phantomWallet) {
        return phantomWalletRepository.save(phantomWallet);
    }

    public Optional<PhantomWallet> findByWalletAddress(String walletAddress) {
        return phantomWalletRepository.findByWalletAddress(walletAddress);
    }

    public List<PhantomWallet> findAll() {
        return phantomWalletRepository.findAll();
    }
}
