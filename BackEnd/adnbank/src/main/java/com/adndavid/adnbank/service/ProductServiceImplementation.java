package com.adndavid.adnbank.service;

import com.adndavid.adnbank.entity.Client;
import com.adndavid.adnbank.entity.Product;
import org.springframework.stereotype.Service;

@Service
public class ProductServiceImplementation implements ProductService{
    @Override
    public Product createProduct(Product product) {
        return null;
    }

    @Override
    public Client updateProduct(int account_number) {
        return null;
    }

    @Override
    public int generateAccountNumber(String type_of_account) {
        int randomNumber;
        String prefix="";
        String suffix="";
        final int NUMBER_LENGHT=8;
        int accountNumber;

        for (int i=1; i <=NUMBER_LENGHT; i++){
            randomNumber=(int)(Math.random()*9);
            suffix+=randomNumber;
        }
        if (type_of_account.equals("Ahorros")){
            prefix="46";
        }else if (type_of_account.equals("Corriente")){
            prefix="23";
        }
        accountNumber=Integer.parseInt(prefix+suffix);
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
}
