package org.chandima.orderservice.client;


import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import io.github.resilience4j.retry.annotation.Retry;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.service.annotation.GetExchange;


public interface InventoryClient {

    String INSTANCE_NAME = "inventory";
    Logger log = LoggerFactory.getLogger(InventoryClient.class);


    @GetExchange("/api/inventory")
    @CircuitBreaker(name = INSTANCE_NAME, fallbackMethod = "fallbackResponse")
    @Retry(name = "inventory")
    boolean isInStock(@RequestParam String skuCode, @RequestParam Integer quantity);


    // Fallback Method
    default boolean fallbackResponse(String skuCode, Integer quantity, Exception ex) {
        log.error("Inventory Service is unavailable. Returning fallback response.", ex);
        return false;
    }

}
