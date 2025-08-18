package com.example.demo.services;

import com.example.demo.priceclient.CoingeckoClient;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class PriceService {

    private final CoingeckoClient client;

    public PriceService(CoingeckoClient client) {
        this.client = client;
    }

    public Map<String, Object> getPrice(List<String> ids, String vs) {
        return client.getPrices(ids, vs);
    }

    public Map<String, Object> getPrice(String id, String vs) {
        return client.getPrices(List.of(id), vs);
    }
}
