package com.adndavid.adnbank.entity;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name="products")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int product_id;

    private String type_of_account;
    private int account_number;
    private String state;
    private float current_balance;
    private float available_balance;
    private boolean exempt_of_gmf;
    private LocalDateTime creation_date_of_the_account;
    private String creation_user;
    private LocalDateTime last_modification_date;
    private String last_modification_user;
    private int client_owner;

    public Product(){
    }

    public int getProduct_id() {
        return product_id;
    }

    public void setProduct_id(int product_id) {
        this.product_id = product_id;
    }

    public String getType_of_account() {
        return type_of_account;
    }

    public void setType_of_account(String type_of_account) {
        this.type_of_account = type_of_account;
    }

    public int getAccount_number() {
        return account_number;
    }

    public void setAccount_number(int account_number) {
        this.account_number = account_number;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public float getCurrent_balance() {
        return current_balance;
    }

    public void setCurrent_balance(float current_balance) {
        this.current_balance = current_balance;
    }

    public float getAvailable_balance() {
        return available_balance;
    }

    public void setAvailable_balance(float available_balance) {
        this.available_balance = available_balance;
    }

    public boolean isExempt_from_gmf() {
        return exempt_of_gmf;
    }

    public void setExempt_from_gmf(boolean exempt_of_gmf) {
        this.exempt_of_gmf = exempt_of_gmf;
    }

    public LocalDateTime getCreation_date_of_the_account() {
        return creation_date_of_the_account;
    }

    public void setCreation_date_of_the_account(LocalDateTime creation_date_of_the_account) {
        this.creation_date_of_the_account = creation_date_of_the_account;
    }

    public String getCreation_user() {
        return creation_user;
    }

    public void setCreation_user(String creation_user) {
        this.creation_user = creation_user;
    }

    public LocalDateTime getLast_modification_date() {
        return last_modification_date;
    }

    public void setLast_modification_date(LocalDateTime last_modification_date) {
        this.last_modification_date = last_modification_date;
    }

    public String getLast_modification_user() {
        return last_modification_user;
    }

    public void setLast_modification_user(String last_modification_user) {
        this.last_modification_user = last_modification_user;
    }

    public int getClient_owner() {
        return client_owner;
    }

    public void setClient_owner(int client_owner) {
        this.client_owner = client_owner;
    }
}
