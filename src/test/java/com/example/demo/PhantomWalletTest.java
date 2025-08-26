package com.example.demo;

import com.example.demo.data.model.PhantomWallet;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class PhantomWalletTest {

    @Test
    void testPhantomWalletCreation() {
        String walletAddress = "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa";
        PhantomWallet wallet = new PhantomWallet(walletAddress);

        assertEquals(walletAddress, wallet.getWalletAddress());
    }

    @Test
    void testEmptyWalletCreation() {
        PhantomWallet wallet = new PhantomWallet();
        assertNull(wallet.getWalletAddress());
        assertNull(wallet.getId());
    }

    @Test
    void testSettersAndGetters() {
        PhantomWallet wallet = new PhantomWallet();
        wallet.setWalletAddress("test-wallet-address");
        wallet.setId(123L);

        assertEquals("test-wallet-address", wallet.getWalletAddress());
        assertEquals(123L, wallet.getId());
    }
}