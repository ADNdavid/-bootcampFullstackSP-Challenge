package com.adndavid.adnbank.entity;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name="clients")
public class Client {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer client_id;

    private String type_of_identification;
    private String identification_number;
    private String name;
    private String lastname;
    private String e_mail;
    private LocalDate born_date;
    private LocalDateTime creation_date_of_the_account;
    private String creation_user;
    private LocalDateTime last_modification_date;
    private String last_modification_user;

    public Client(){
    }

    public Integer getClient_id() {
        return client_id;
    }

    public void setClient_id(int client_id) {
        this.client_id = client_id;
    }

    public String getType_of_identification() {
        return type_of_identification;
    }

    public void setType_of_identification(String type_of_identification) {
        this.type_of_identification = type_of_identification;
    }

    public String getIdentification_number() {
        return identification_number;
    }

    public void setIdentification_number(String identification_number) {
        this.identification_number = identification_number;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getE_mail() {
        return e_mail;
    }

    public void setE_mail(String e_mail) {
        this.e_mail = e_mail;
    }

    public LocalDate getBorn_date() {
        return born_date;
    }

    public void setBorn_date(LocalDate born_date) {
        this.born_date = born_date;
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
}
