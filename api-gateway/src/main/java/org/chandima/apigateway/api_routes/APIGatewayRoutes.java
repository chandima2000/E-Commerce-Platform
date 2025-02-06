package org.chandima.apigateway.api_routes;

import org.springframework.cloud.gateway.server.mvc.handler.GatewayRouterFunctions;
import org.springframework.cloud.gateway.server.mvc.handler.HandlerFunctions;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.function.RequestPredicates;
import org.springframework.web.servlet.function.RouterFunction;
import org.springframework.web.servlet.function.ServerResponse;

import java.net.URI;

import static org.springframework.cloud.gateway.server.mvc.filter.CircuitBreakerFilterFunctions.circuitBreaker;
import static org.springframework.cloud.gateway.server.mvc.filter.FilterFunctions.setPath;
import static org.springframework.cloud.gateway.server.mvc.handler.GatewayRouterFunctions.route;


@Configuration
public class APIGatewayRoutes {

    // Functional Endpoints Approach

    @Bean
    public RouterFunction<ServerResponse> productServiceRoutes(){
        return route("product-service")
                .route(RequestPredicates.path("/api/product"), HandlerFunctions.http("http://localhost:8080"))
                .filter(circuitBreaker("productServiceCircuitBreaker",
                        URI.create("forward:/fallbackRoute")))
                .build();
    }

    // Aggregate Product Service API
    @Bean
    public RouterFunction<ServerResponse> productServiceSwaggerRoutes() {
        return route("product-service-swagger")
                .route(RequestPredicates.path("/aggregate/product-service/v3/api-docs"), HandlerFunctions.http("http://localhost:8080"))
                .filter(circuitBreaker("productServiceSwaggerCircuitBreaker",
                        URI.create("forward:/fallbackRoute")))
                .filter(setPath("/api-docs"))
                .build();
    }//when a request is made to the API Gateway at 👉 http://localhost:8080/aggregate/product-service/v3/api-docs
    //It forwards the request to the Product Service Swagger API 👉 http://localhost:8080/api-docs.


    @Bean
    public RouterFunction<ServerResponse> orderServiceRoutes(){
        return route("order-service")
                .route(RequestPredicates.path("/api/order"), HandlerFunctions.http("http://localhost:8081"))
                .filter(circuitBreaker("orderServiceCircuitBreaker",
                        URI.create("forward:/fallbackRoute")))
                .build();
    }

    // Aggregate Order Service API
    @Bean
    public RouterFunction<ServerResponse> orderServiceSwaggerRoutes() {
        return route("order-service-swagger")
                .route(RequestPredicates.path("/aggregate/order-service/v3/api-docs"),
                        HandlerFunctions.http("http://localhost:8081"))
                .filter(circuitBreaker("orderServiceSwaggerCircuitBreaker",
                        URI.create("forward:/fallbackRoute")))
                .filter(setPath("/api-docs"))
                .build();
    }

    @Bean
    public RouterFunction<ServerResponse> inventoryServiceRoutes(){
        return route("inventory-service")
                .route(RequestPredicates.path("/api/inventory"),
                        HandlerFunctions.http("http://localhost:8082"))
                .filter(circuitBreaker("inventoryServiceCircuitBreaker",
                        URI.create("forward:/fallbackRoute")))
                .build();
    }

    // Aggregate Inventory Service API
    @Bean
    public RouterFunction<ServerResponse> inventoryServiceSwaggerRoutes() {
        return route("inventory-service-swagger")
                .route(RequestPredicates.path("/aggregate/inventory-service/v3/api-docs"),
                        HandlerFunctions.http("http://localhost:8082"))
                .filter(circuitBreaker("inventoryServiceSwaggerCircuitBreaker",
                        URI.create("forward:/fallbackRoute")))
                .filter(setPath("/api-docs"))
                .build();
    }


    // Implementing Fallback Mechanism
    @Bean
    public RouterFunction<ServerResponse> fallbackRoute() {
        return route("fallbackRoute")
                .GET("/fallbackRoute",request -> ServerResponse.status(HttpStatus.SERVICE_UNAVAILABLE)
                        .body("Service Unavailable, Please try again later!"))
                .build();
    }

}
