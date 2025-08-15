package com.example.demo.priceclient;

import org.springframework.beans.factory.annotation.Value;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class BitcoinPriceClient {

    @Value("{api.key}")
    private final HttpClient client;
    private String apiKey = "CG-LErnGpq5xtsywCybsabmuXQs";

    public BitcoinPriceClient() {
        client = HttpClient.newHttpClient();
    }

    public String findBitcoinPrice() throws IOException, InterruptedException {
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("https://api.coingecko.com/api/v3/simple/price?vs_currencies=usd&ids=bitcoin&names=Bitcoin&symbols=btc&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true&include_last_updated_at=true&precision=full"))
                .header("accept", "application/json")
                .header("x-cg-api-key", apiKey)
                .method("GET", HttpRequest.BodyPublishers.noBody())
                .build();
        HttpResponse<String> response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());
        System.out.println(response.body());
        return response.body();
    }
}
