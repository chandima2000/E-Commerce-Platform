package org.chandima.productservice.dto;

import java.math.BigDecimal;

public record ProductRequest(String Id, String name, String description, BigDecimal price) { }
