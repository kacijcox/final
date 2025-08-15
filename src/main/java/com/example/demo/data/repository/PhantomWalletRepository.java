package com.example.demo.data.repository;

import com.example.demo.data.model.PhantomWallet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PhantomWalletRepository extends JpaRepository<PhantomWallet, Long> {
    Optional<PhantomWallet> findByWalletAddress(String walletAddress);
}