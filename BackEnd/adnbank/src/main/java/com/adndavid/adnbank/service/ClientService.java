package com.adndavid.adnbank.service;

import com.adndavid.adnbank.entity.Client;

import java.time.LocalDate;
import java.util.List;

public interface ClientService {

    //main methods:
    public Client createClient(Client client);
    public Client updateClient(Client client);
    public boolean deleteClient(int id);

    //validation methods:
    public boolean adultChecker(LocalDate born_date);
    public LocalDate calculateCreationDate();
    public boolean uncancelledProductsChecker();

    //optional methods:
    public List<Client> findAllClients();
    public Client findClientById(int id);

}
