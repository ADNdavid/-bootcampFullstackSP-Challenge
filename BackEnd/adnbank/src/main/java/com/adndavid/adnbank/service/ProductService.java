package com.adndavid.adnbank.service;

import com.adndavid.adnbank.entity.Client;
import com.adndavid.adnbank.entity.Product;

public interface ProductService {

    //main methods:
    public Product createProduct(Product product);
    public Client updateProduct(int account_number);
    public int generateAccountNumber(String type_of_account);
    public float calculateCurrentBalance();
    public float calculateAvailableBalance();
    public boolean gmfSwitch();

    //validation methods:
    public String getCreationDate();
    //optional methods:
    public boolean balanceChecker();

    //optional methods:
}
