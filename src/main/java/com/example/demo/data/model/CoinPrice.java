package com.example.demo.data.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.time.LocalDateTime;

@Entity
@Table(name = "coin_price")

public class CoinPrice {

    public CoinPrice() {
    }

    @Id
    @Column(name = "id")
    private String coinId;

    @Column(name = "usd", nullable = false)
    private Integer coinUsd;

    @Column(name = "usd_market_cap", nullable = false)
    private Integer coinUsdMarketCap;

    @Column(name = "usd_24h_vol", nullable = false)
    private Integer coinUsd24Vol;

    @Column(name = "usd_24h_change", nullable = false)
    private Integer coinUsd24Change;

    @Column(name = "last_updated_at", nullable = false)
    private LocalDateTime coinLastUpdatedAt;

    public String getCoinId() {
        return coinId;
    }

    public void setCoinId(String coinId) {
        this.coinId = coinId;
    }

    public Integer getCoinUsd() {
        return coinUsd;
    }

    public void setCoinUsd(Integer coinUsd) {
        this.coinUsd = coinUsd;
    }

    public Integer getCoinUsdMarketCap() {
        return coinUsdMarketCap;
    }

    public void setCoinUsdMarketCap(Integer coinUsdMarketCap) {
        this.coinUsdMarketCap = coinUsdMarketCap;
    }

    public Integer getCoinUsd24Vol() {
        return coinUsd24Vol;
    }

    public void setCoinUsd24Vol(Integer coinUsd24Vol) {
        this.coinUsd24Vol = coinUsd24Vol;
    }

    public Integer getCoinUsd24Change() {
        return coinUsd24Change;
    }

    public void setCoinUsd24Change(Integer coinUsd24Change) {
        this.coinUsd24Change = coinUsd24Change;
    }

    public LocalDateTime getCoinLastUpdatedAt() {
        return coinLastUpdatedAt;
    }

    public void setCoinLastUpdatedAt(LocalDateTime coinLastUpdatedAt) {
        this.coinLastUpdatedAt = coinLastUpdatedAt;
    }
}
