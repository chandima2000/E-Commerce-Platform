package org.chandima.orderservice;

import io.restassured.RestAssured;
import org.chandima.orderservice.stubs.InventoryClientStub;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.boot.testcontainers.service.connection.ServiceConnection;
import org.springframework.cloud.contract.wiremock.AutoConfigureWireMock;
import org.springframework.context.annotation.Import;
import org.testcontainers.containers.MySQLContainer;
import org.hamcrest.Matchers;


@Import(TestcontainersConfiguration.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureWireMock(port = 0)
class OrderServiceApplicationTests {

    // Initialize MySql Container
    @ServiceConnection
    static MySQLContainer mySQLContainer = new MySQLContainer("mysql:8.3.0");

    @LocalServerPort
    private Integer port;

    // Setup REST-assured
    @BeforeEach
    void setup(){
        RestAssured.baseURI = "http://localhost";
        RestAssured.port = port;
    }

    // Start the MySql Test Container
    static {
        mySQLContainer.start();
    }


    @Test
    void shouldPlaceOrder() {

        String requestBody = """
                {
                    "skuCode":"iphone_16",
                    "price":1000,
                    "quantity":1
                }
        """;

        // Add wiremock server
        InventoryClientStub.stubInventoryCall("iphone_16",1);

        RestAssured.given()
                .contentType("application/json")
                .body(requestBody)
                .when()
                .post("/api/order")
                .then()
                .statusCode(201)
                .body(Matchers.equalTo("Order is placed successfully"));

    }

}
