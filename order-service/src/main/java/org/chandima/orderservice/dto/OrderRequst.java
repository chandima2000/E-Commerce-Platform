package org.chandima.orderservice.dto;

import java.math.BigDecimal;

public record OrderRequst(
        Long id,
        String orderNumber,
        String skuCode,
        BigDecimal price,
        Integer quantity) { }
