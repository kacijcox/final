package com.example.demo.priceclient;

import org.springframework.beans.factory.annotation.Value;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class SolPriceClient {

    @Value("{api.key}")
    // private final String BASE_URL = "https://api.coingecko.com/api/v3/simple/price";
    private final HttpClient client;

    public SolPriceClient() {
        client = HttpClient.newHttpClient();
    }

    public String findSolPrice() throws IOException, InterruptedException {
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("https://api.coingecko.com/api/v3/simple/price?vs_currencies=usd&ids=solana&names=Solana&symbols=solw&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true&include_last_updated_at=true&precision=full"))
                .header("accept", "application/json")
                .header("x-cg-api-key", "{api.key}")
                .method("GET", HttpRequest.BodyPublishers.noBody())
                .build();
        HttpResponse<String> response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());
        System.out.println(response.body());
        return "";
    }
}

