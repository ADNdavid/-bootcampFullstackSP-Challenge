package com.adndavid.adnbank.repository;

import com.adndavid.adnbank.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    @Query(value="SELECT * FROM products WHERE client_owner = ?1 ORDER BY state ASC, current_balance DESC;",nativeQuery = true)
    List<Product> findProductsByClientOwner(String clientOwner);

    @Query(value="SELECT * FROM products WHERE account_number = ?1",nativeQuery = true)
    Product findProductByAccountNumber(long accountNumber);

}
