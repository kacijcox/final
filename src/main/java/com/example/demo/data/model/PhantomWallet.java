package com.example.demo.data.model;

import jakarta.persistence.*;

@Entity
@Table(name = "phantom_wallets")
public class PhantomWallet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "wallet_address", unique = true, nullable = false)
    private String walletAddress;

    public PhantomWallet() {
    }

    public PhantomWallet(String walletAddress) {
        this.walletAddress = walletAddress;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getWalletAddress() {
        return walletAddress;
    }

    public void setWalletAddress(String walletAddress) {
        this.walletAddress = walletAddress;
    }
}