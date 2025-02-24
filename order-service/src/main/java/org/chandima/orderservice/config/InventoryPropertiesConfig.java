package org.chandima.orderservice.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;

@Getter
@Setter
@ConfigurationProperties(prefix = "inventory.service")
public class InventoryPropertiesConfig {

    private String url;

}
