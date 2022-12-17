package com.adndavid.adnbank.service;

import com.adndavid.adnbank.entity.Product;

import java.util.List;

public interface ProductService {

    //main methods:
    public Product createProduct(Product product);
    public Product updateProduct(Product Product);
    public long generateAccountNumber(String type_of_account);
    public float calculateCurrentBalance();
    public float calculateAvailableBalance();
    public boolean gmfSwitch();

    //validation methods:
    public String getCreationDate();
    //optional methods:
    public boolean balanceChecker();

    //optional methods:
    public List<Product> findProducts(String clientOwner);

    public Product findProduct(long accountNumber);
}
