# E-Commerce Microservices System

## Overview
This project is a microservices-based e-commerce application designed to handle various functionalities such as product management, order processing, inventory tracking, user authentication with Keycloak, event-driven architecture using Kafka, sending e-mail notifications, and observability using Grafana, Prometheus, and Zipkin.

## Architecture
The system follows an event-driven microservices architecture using Spring Boot, Spring Cloud Gateway MVC, Kafka, and Docker.

![alt text](https://github.com/chandima2000/E-Commerce-Platform/blob/main/architecture.png)

## Microservices Overview
- **API Gateway (Spring Cloud Gateway)** - Acts as the entry point to the system.
- **Product Service** - Manages product-related operations.
- **Order Service** - Handles order creation and management.
- **Inventory Service** - Manages product stock levels.
- **Notification Service** - Sends email notifications using Java Mail and Kafka.

### Communication Between Services
- **Synchronous:** REST communication between Order Service and Inventory Service.
- **Asynchronous:** Kafka event-driven communication between Order Service and Notification Service.

## Tech Stack
### Backend
- **Java 21**
- **Spring Boot 3.2.4**
- **Spring Cloud Gateway MVC (API Gateway)**
- **Spring Data MongoDB (Product Service)**
- **Spring Data JPA (MySQL) (Order & Inventory Services)**
- **Spring Security & Keycloak (Authentication & Authorization)**
- **Resilience4J (Circuit Breaker)**
- **Apache Kafka & Schema Registry (Event-driven architecture)**
- **Prometheus, Grafana, Loki, Zipkin (Observability & Monitoring)**

### Frontend
- **React (with Keycloak Integration)**

### DevOps & Deployment
- **Docker & Docker Compose**
- **Kubernetes (Planned for future)**
- **TestContainers (For Integration Testing)**

## Microservices Breakdown
### 1. API Gateway
- Routes requests to appropriate services.
- Secured using Keycloak OAuth2.

### 2. Product Service
- Manages product catalog.
- Uses MongoDB as the database.
- Provides OpenAPI documentation with SpringDoc.
- Supports image upload (Planned - Firebase Storage).

### 3. Order Service
- Handles order placement.
- Communicates synchronously with Inventory Service (via RESTClient).
- Publishes an event to Kafka when an order is placed.

### 4. Inventory Service
- Manages stock levels.
- REST API exposed to Order Service for checking stock.

### 5. Notification Service
- Listens to Kafka topic **"order-placed"**.
- Sends email notifications using Java Mail Sender.

## Observability & Monitoring
- **Spring Boot Actuator** - Exposes application metrics.
- **Resilience4J** - Enables Circuit Breaker patterns.
- **Prometheus & Grafana** - Monitors application metrics.
- **Zipkin & Micrometer** - Traces requests across microservices.
- **Loki & Logback** - Centralized logging.

## How to Run Locally
### Prerequisites
- **Docker & Docker Compose**
- **Java 21**
- **Maven**
- **Node.js (For Frontend)**

### Running Backend Services
```sh
git clone https://github.com/chandima2000/E-Commerce-Platform.git
cd E-Commerce-Platform
docker-compose up --build
```

### Running Frontend
```sh
cd frontend
npm install
npm run dev
```

## API Documentation
- **Swagger UI:** [http://localhost:8080/swagger-ui.html](http://localhost:8080/swagger-ui.html)
- **OpenAPI JSON:** [http://localhost:8080/v3/api-docs](http://localhost:8080/v3/api-docs)

## Circuit Breaker Configuration (Resilience4J)
- **Sliding Window:** COUNT_BASED (10 requests)
- **Failure Rate Threshold:** 50%
- **Timeout Duration:** 3s
- **Auto Recovery:** Yes

## Keycloak Authentication
- **Login URL:** [http://localhost:8181/auth](http://localhost:8181/auth)
- **Realm:** `e-commerce-platform`
- **Client ID:** `react-client`

## Contributing
Feel free to contribute by submitting a Pull Request or reporting issues!

## License
This project is licensed under the **MIT License**.
