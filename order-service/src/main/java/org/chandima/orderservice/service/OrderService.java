package org.chandima.orderservice.service;

import lombok.RequiredArgsConstructor;
import org.chandima.orderservice.client.InventoryClient;
import org.chandima.orderservice.dto.OrderRequst;
import org.chandima.orderservice.model.Order;
import org.chandima.orderservice.repository.OrderRepository;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;

    private final InventoryClient inventoryClient;

    public void placeOrder(OrderRequst orderRequst) {

        try {
            boolean isStockAvailable = inventoryClient.isInStock(orderRequst.skuCode(), orderRequst.quantity());

            //        Order order = new Order();
            //        order.setOrderNumber(UUID.randomUUID().toString());
            //        order.setPrice(orderRequst.price());
            //        order.setSkuCode(orderRequst.skuCode());
            //        order.setQuantity(orderRequst.quantity());
            //        orderRepository.save(order);

            if (isStockAvailable) {
                // use the Builder Pattern
                Order order = Order.builder()
                        .orderNumber(UUID.randomUUID().toString())
                        .price(orderRequst.price())
                        .skuCode(orderRequst.skuCode())
                        .quantity(orderRequst.quantity())
                        .build();

                orderRepository.save(order);
            } else {
                throw new RuntimeException("Product with skuCode " + orderRequst.skuCode() + " is not available");
            }
        }
        catch (Exception e) {
            throw new RuntimeException("Inventory Service is down. Please try again later.");
        }


    }
}
