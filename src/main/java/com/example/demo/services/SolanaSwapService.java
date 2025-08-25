package com.example.demo.services;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;

import java.util.*;

@Service
public class SolanaSwapService {

    private static final String RPC_URL = "https://api.mainnet-beta.solana.com";

    private RestTemplate restTemplate = new RestTemplate();
    private ObjectMapper mapper = new ObjectMapper();

    public JsonNode getAccountInfo(String wallet) {
        ArrayNode result = mapper.createArrayNode();

        try {
            ArrayNode accountsV1 = getByOwner(wallet, "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA", true);
            ArrayNode accountsV22 = getByOwner(wallet, "TokenzQdBNbLqP3x6S4B2hgYQ6VYbYQG1wN2GtG8eK9", true);

            if ((accountsV1 == null || accountsV1.isEmpty()) &&
                    (accountsV22 == null || accountsV22.isEmpty())) {
                accountsV1 = getByOwner(wallet, "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA", false);
                accountsV22 = getByOwner(wallet, "TokenzQdBNbLqP3x6S4B2hgYQ6VYbYQG1wN2GtG8eK9", false);
            }

            if (accountsV1 != null) result.addAll(accountsV1);
            if (accountsV22 != null) result.addAll(accountsV22);

        } catch (Exception e) {
            e.printStackTrace();
        }

        return result;
    }

    private ArrayNode getByOwner(String wallet, String programId, boolean useJsonParsed) {
        try {
            Map<String, Object> req = new HashMap<>();
            req.put("jsonrpc", "2.0");
            req.put("id", 1);

            if (useJsonParsed) {
                req.put("method", "getTokenAccountsByOwner");
            } else {
                req.put("method", "getParsedTokenAccountsByOwner");
            }

            Map<String, Object> filter = new HashMap<>();
            filter.put("programId", programId);

            Map<String, Object> opts = new HashMap<>();
            opts.put("commitment", "finalized");
            if (useJsonParsed) {
                opts.put("encoding", "jsonParsed");
            }

            req.put("params", Arrays.asList(wallet, filter, opts));

            HttpHeaders headers = new HttpHeaders();
            headers.set("Content-Type", "application/json");
            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(req, headers);

            ResponseEntity<String> response = restTemplate.exchange(
                    RPC_URL, HttpMethod.POST, entity, String.class
            );

            JsonNode root = mapper.readTree(response.getBody());
            JsonNode value = root.path("result").path("value");

            ArrayNode out = mapper.createArrayNode();
            if (value != null && value.isArray()) {
                for (JsonNode acc : value) {
                    JsonNode parsed = acc.path("account").path("data").path("parsed");
                    JsonNode info = parsed.path("info");
                    JsonNode amount = info.path("tokenAmount");

                    ObjectNode entry = mapper.createObjectNode();
                    entry.put("programId", programId);
                    entry.put("tokenAccount", acc.path("pubkey").asText());
                    entry.put("mint", info.path("mint").asText());
                    entry.put("owner", info.path("owner").asText());
                    entry.put("amount", amount.path("amount").asText());
                    entry.put("decimals", amount.path("decimals").asInt());

                    if (amount.path("uiAmount").isNumber()) {
                        entry.put("uiAmount", amount.path("uiAmount").decimalValue());
                    }

                    entry.put("uiAmountString", amount.path("uiAmountString").asText(""));
                    out.add(entry);
                }
            }
            return out;

        } catch (Exception e) {
            e.printStackTrace();
            return mapper.createArrayNode();
        }
    }
}