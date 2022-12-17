package com.adndavid.adnbank.service;

import com.adndavid.adnbank.entity.Product;
import com.adndavid.adnbank.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductServiceImplementation implements ProductService {

    @Autowired
    ProductRepository productRepository;

    @Override
    public Product createProduct(Product product) {
        return productRepository.save(product);
    }

    @Override
    public Product updateProduct(Product product) {
        return productRepository.save(product);
    }

    @Override
    public long generateAccountNumber(String type_of_account) {
        int randomNumber;
        String prefix = "";
        String suffix = "";
        final int NUMBER_LENGHT = 8;
        int accountNumber;

        for (int i = 1; i <= NUMBER_LENGHT; i++) {
            randomNumber = (int) (Math.random() * 9);
            suffix += randomNumber;
        }
        if (type_of_account.equals("Ahorros")) {
            prefix = "46";
        } else if (type_of_account.equals("Corriente")) {
            prefix = "23";
        }
        accountNumber = Integer.parseInt(prefix + suffix);
        return accountNumber;
    }

    @Override
    public float calculateCurrentBalance() {
        return 0;
    }

    @Override
    public float calculateAvailableBalance() {
        return 0;
    }

    @Override
    public boolean gmfSwitch() {
        return false;
    }

    @Override
    public String getCreationDate() {
        return null;
    }

    @Override
    public boolean balanceChecker() {
        return false;
    }

    @Override
    public List<Product> findProducts(String clientOwner) {
        return productRepository.findProductsByClientOwner(clientOwner);
    }

    @Override
    public Product findProduct(long accountNumber) {
        return productRepository.findProductByAccountNumber(accountNumber);
    }

}
