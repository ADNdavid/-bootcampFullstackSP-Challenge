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
    private float avaliable_balance;
    private int origin_product;
    private int target_product;
    private String creation_user;

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

    public float getAvaliable_balance() {
        return avaliable_balance;
    }

    public void setAvaliable_balance(float avaliable_balance) {
        this.avaliable_balance = avaliable_balance;
    }

    public int getOrigin_product() {
        return origin_product;
    }

    public void setOrigin_product(int origin_product) {
        this.origin_product = origin_product;
    }

    public int getTarget_product() {
        return target_product;
    }

    public void setTarget_product(int target_product) {
        this.target_product = target_product;
    }

    public String getCreation_user() {
        return creation_user;
    }

    public void setCreation_user(String creation_user) {
        this.creation_user = creation_user;
    }
}
