package org.chandima.inventoryservice.repository;

import org.chandima.inventoryservice.model.Inventory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InventoryRepository extends JpaRepository<Inventory, Long> {

    // Find an inventory for given skuCode where quantity .
   public abstract boolean existsBySkuCodeAndQuantityGreaterThanEqual(String skuCode, Integer quantity);

}
