package com.adndavid.adnbank.entity;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name="financial_movements")
public class FinancialMovement {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int movement_id;

    private LocalDateTime movement_date;
    private String type_of_transaction;
    private String description;
    private float amount;
    private String type_of_movement;
    private float current_balance;
    private float available_balance;
    private long origin_product;
    private long target_product;
    private String creation_user;
    private boolean successful_transaction;

    public FinancialMovement(){
    }

    public int getMovement_id() {
        return movement_id;
    }

    public void setMovement_id(int movement_id) {
        this.movement_id = movement_id;
    }

    public LocalDateTime getMovement_date() {
        return movement_date;
    }

    public void setMovement_date(LocalDateTime movement_date) {
        this.movement_date = movement_date;
    }

    public String getType_of_transaction() {
        return type_of_transaction;
    }

    public void setType_of_transaction(String type_of_transaction) {
        this.type_of_transaction = type_of_transaction;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public float getAmount() {
        return amount;
    }

    public void setAmount(float amount) {
        this.amount = amount;
    }

    public String getType_of_movement() {
        return type_of_movement;
    }

    public void setType_of_movement(String type_of_movement) {
        this.type_of_movement = type_of_movement;
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

    public long getOrigin_product() {
        return origin_product;
    }

    public void setOrigin_product(long origin_product) {
        this.origin_product = origin_product;
    }

    public long getTarget_product() {
        return target_product;
    }

    public void setTarget_product(long target_product) {
        this.target_product = target_product;
    }

    public String getCreation_user() {
        return creation_user;
    }

    public void setCreation_user(String creation_user) {
        this.creation_user = creation_user;
    }

    public boolean getSuccessful_transaction() {
        return successful_transaction;
    }

    public void setSuccessful_transaction(boolean successful_transaction) {
        this.successful_transaction = successful_transaction;
    }
}
