package com.example.demo.priceclient;

import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.Map;

@Component
public class CoingeckoClient {
    // temp hard coding
    private static final String BASE_URL = "https://api.coingecko.com/api/v3/simple/price";
    // simple rest template
    private final RestTemplate restTemplate = new RestTemplate();

    //the ids i am using for example, bitcoin, ethereum and vs is usd. can default to usd if vs is empty
    public Map<String, Object> getPrices(List<String> ids, String vs) {
        if (ids == null || ids.isEmpty()) {
            throw new IllegalArgumentException("id cannot be empty");

        }
        if (vs == null || vs.isBlank()) {
            vs = "usd";
        }


        String idsParam = String.join(",", ids);

        URI uri = UriComponentsBuilder.fromHttpUrl(BASE_URL)
                .queryParam("ids", idsParam)
                .queryParam("vs_currencies", vs)
                .queryParam("include_market_cap", "true")
                .queryParam("include_24hr_vol", "true")
                .queryParam("include_24hr_change", "true")
                .queryParam("precision", "full")
                .build(true)
                .toUri();

        Map<String, Object> body = restTemplate.getForObject(uri, Map.class);
        return body;
    }
}

