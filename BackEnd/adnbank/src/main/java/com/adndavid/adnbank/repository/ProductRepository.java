package com.adndavid.adnbank.repository;

import com.adndavid.adnbank.entity.Client;
import com.adndavid.adnbank.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {
}
