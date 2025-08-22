package com.example.demo.services;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;

import java.util.*;

@Service
public class SolanaSwapService {

    private static final String SOLANA_RPC_URL = "https://api.mainnet-beta.solana.com";
    private static final String WALLET_ADDRESS = "DdLDN9eVmwHfpwERCQnG9Q1EZPgC5xH2AcR7PaNvsGEo";

    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper objectMapper = new ObjectMapper();

    //get tx sigs
    public List<String> getRecentTransactions(int limit) {
        try {
            //json rpc request
            Map<String, Object> rpcRequest = new HashMap<>();
            rpcRequest.put("jsonrpc", "2.0");
            rpcRequest.put("id", 1);
            rpcRequest.put("method", "getSignaturesForAddress");

            Map<String, Object> params = new HashMap<>();
            params.put("limit", limit);

            rpcRequest.put("params", Arrays.asList(WALLET_ADDRESS, params));

            //send out the request
            HttpHeaders headers = new HttpHeaders();
            headers.set("Content-Type", "application/json");
            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(rpcRequest, headers);

            ResponseEntity<String> response = restTemplate.exchange(
                    SOLANA_RPC_URL,
                    HttpMethod.POST,
                    entity,
                    String.class
            );

            //parse the response
            JsonNode result = objectMapper.readTree(response.getBody()).get("result");

            List<String> signatures = new ArrayList<>();
            if (result != null && result.isArray()) {
                for (JsonNode tx : result) {
                    signatures.add(tx.get("signature").asText());
                }
            }

            return signatures;

        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
            return Collections.emptyList();
        }
    }
}
