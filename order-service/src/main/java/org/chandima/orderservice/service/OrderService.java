package org.chandima.orderservice.service;

import lombok.RequiredArgsConstructor;
import org.chandima.orderservice.dto.OrderRequst;
import org.chandima.orderservice.model.Order;
import org.chandima.orderservice.repository.OrderRepository;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;

    public void placeOrder(OrderRequst orderRequst) {

//        Order order = new Order();
//        order.setOrderNumber(UUID.randomUUID().toString());
//        order.setPrice(orderRequst.price());
//        order.setSkuCode(orderRequst.skuCode());
//        order.setQuantity(orderRequst.quantity());
//        orderRepository.save(order);


       // use the Builder Pattern
        Order order = Order.builder()
                .orderNumber(UUID.randomUUID().toString())
                .price(orderRequst.price())
                .skuCode(orderRequst.skuCode())
                .quantity(orderRequst.quantity())
                .build();

        orderRepository.save(order);

    }
}
