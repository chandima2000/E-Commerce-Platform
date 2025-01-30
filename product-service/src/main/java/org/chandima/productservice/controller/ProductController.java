package org.chandima.productservice.controller;

import lombok.RequiredArgsConstructor;
import org.chandima.productservice.dto.ProductRequest;
import org.chandima.productservice.dto.ProductResponse;
import org.chandima.productservice.service.ProductService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/product")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    // Save a new Product to DB
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ProductResponse createProduct(@RequestBody ProductRequest productRequest) {

        return productService.createProduct(productRequest);

    }


    // Get All Products from the DB
    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<ProductResponse> getAllProducts() {
        return productService.getAllProducts();
    }

}
