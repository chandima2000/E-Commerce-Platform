package org.chandima.orderservice.controller;

import lombok.RequiredArgsConstructor;
import org.chandima.orderservice.dto.OrderRequst;
import org.chandima.orderservice.service.OrderService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/order")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public String placeOrder(@RequestBody OrderRequst orderRequst){
        System.out.println(orderRequst);
        orderService.placeOrder(orderRequst);
        return "Order is placed successfully";
    }

}
