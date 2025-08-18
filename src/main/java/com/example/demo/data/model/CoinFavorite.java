// Java
package com.example.demo.data.model;

import jakarta.persistence.*;

@Entity
@Table(
        name = "coin_favorites",
        uniqueConstraints = {
                @UniqueConstraint(name = "uq_coin_fav_user_coin", columnNames = {"user_id", "coin_id"}),
                @UniqueConstraint(name = "uq_coin_fav_wallet_coin", columnNames = {"wallet_address", "coin_id"})
        }
)
public class CoinFavorite {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    //either the user id or wallet address should be present
    @Column(name = "user_id")
    private String userId;

    @Column(name = "wallet_address")
    private String walletAddress;

    @Column(name = "coin_id", nullable = false)
    private String coinId;

    public CoinFavorite() {}

    public CoinFavorite(String userId, String walletAddress, String coinId) {
        this.userId = userId;
        this.walletAddress = walletAddress;
        this.coinId = coinId;
    }

    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }

    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }

    public String getWalletAddress() { return walletAddress; }
    public void setWalletAddress(String walletAddress) { this.walletAddress = walletAddress; }

    public String getCoinId() { return coinId; }
    public void setCoinId(String coinId) { this.coinId = coinId; }
}