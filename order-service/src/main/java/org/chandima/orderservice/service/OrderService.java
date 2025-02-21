package org.chandima.orderservice.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.chandima.common.schema.OrderPlacedEvent;
import org.chandima.orderservice.client.InventoryClient;
import org.chandima.orderservice.dto.OrderRequst;
//import org.chandima.orderservice.schema.OrderPlacedEvent;
import org.chandima.orderservice.model.Order;
import org.chandima.orderservice.repository.OrderRepository;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class OrderService {

    private final OrderRepository orderRepository;

    private final InventoryClient inventoryClient;

    private final KafkaTemplate<String, OrderPlacedEvent> kafkaTemplate;

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

                // send a message to kafka topic
                OrderPlacedEvent orderPlacedEvent = new OrderPlacedEvent();
                orderPlacedEvent.setOrderNumber(order.getOrderNumber());
                orderPlacedEvent.setEmail(orderRequst.userDetails().email());
                orderPlacedEvent.setFirstName(orderRequst.userDetails().firstName());
                orderPlacedEvent.setLastName(orderRequst.userDetails().lastName());


                log.info("Start - Sending Order details {} to Kafka topic", orderPlacedEvent);

                kafkaTemplate.send("order-placed",orderPlacedEvent);

                log.info("End - Sending Order details {} to Kafka topic", orderPlacedEvent);

            } else {
                throw new RuntimeException("Product with skuCode " + orderRequst.skuCode() + " is not available");
            }

        } catch (RuntimeException e) {
            log.error("Error placing order: {}", e.getMessage());
            throw e;
        } catch (Exception e) {
            log.error("Unexpected error: {}", e.getMessage());
            throw new RuntimeException("Order placement failed due to an unexpected error.");
        }

    }
}
