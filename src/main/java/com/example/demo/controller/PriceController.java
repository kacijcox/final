package com.example.demo.controller;


import com.example.demo.services.PriceService;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/prices")
public class PriceController {
    private final PriceService priceService;

    public PriceController(PriceService priceService) {
        this.priceService = priceService;
    }

    @GetMapping("/{id}")
    public Map<String, Object> getPrice(
            @PathVariable("id") String id,
            @RequestParam(name = "vs", defaultValue = "usd") String vs
    ) {
        return priceService.getPrice(id.trim(), vs);
    }
}
