package com.adndavid.adnbank.repository;

import com.adndavid.adnbank.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    @Query(value="((SELECT * FROM products WHERE client_owner = ?1 and state != 'Cancelada' )ORDER BY current_balance DESC, state ASC, creation_date_of_the_account ASC)\n" +
            "union all\n" +
            "((SELECT * FROM products WHERE client_owner = ?1 and state = 'Cancelada'));",nativeQuery = true)
    List<Product> findProductsByClientOwner(String clientOwner);

    @Query(value="SELECT * FROM products WHERE account_number = ?1",nativeQuery = true)
    Product findProductByAccountNumber(long accountNumber);

}
