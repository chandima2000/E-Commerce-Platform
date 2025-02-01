package org.chandima.productservice;

import io.restassured.RestAssured;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.boot.testcontainers.service.connection.ServiceConnection;
import org.springframework.context.annotation.Import;
import org.testcontainers.containers.MongoDBContainer;
import org.hamcrest.Matchers;

@Import(TestcontainersConfiguration.class)

// By default, Test Application run on port 8080. To overcome the conflict, use Random Port.
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class ProductServiceApplicationTests {

	@ServiceConnection // This connects with the application.properties file.
	// Initialize MongoDB Container
	static MongoDBContainer mongoDBContainer = new MongoDBContainer("mongo:7.0.5");

	// Initialize the Random Port
	//  When the application start, Random Port will be injected to this variable.
	@LocalServerPort
	private Integer port;

	@BeforeEach
	// Setup REST-assured
	void setup() {
		RestAssured.baseURI = "http://localhost";
		RestAssured.port = port;
	}

	// Start the mongodb Test Container
	static {
		mongoDBContainer.start();
	}


	@Test
	void shouldCreateProduct() {

		String requestBody = """
					{
						"name":"iphone 16",
						"description":"iphone 16 is latest device",
						"price":100
					}
				""";

		RestAssured.given()
				.contentType("application/json")
				.body(requestBody)
				.when()
				.post("/api/product")
				.then()
				.statusCode(201)
				.body("id", Matchers.notNullValue())
				.body("name", Matchers.equalTo("iphone 16"))
				.body("description",Matchers.equalTo("iphone 16 is latest device"))
				.body("price", Matchers.equalTo(100));

	}

	@Test
	void shouldGetAllProducts() {

		RestAssured.given()
				.when()
				.get("/api/product")
				.then()
				.statusCode(200)
				.body("size()", Matchers.greaterThan(0))
				.body("[0].name", Matchers.equalTo("iphone 16"));
	}

}
