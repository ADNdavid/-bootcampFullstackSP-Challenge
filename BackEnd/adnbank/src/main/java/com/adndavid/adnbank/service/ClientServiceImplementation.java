package com.adndavid.adnbank.service;

import com.adndavid.adnbank.entity.Client;
import com.adndavid.adnbank.repository.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import static java.time.LocalDateTime.*;

@Service
public class ClientServiceImplementation implements ClientService{

    @Autowired
    ClientRepository clientRepository;

    //main methods:

    @Override
    public Client createClient(Client client) {
        /*if(client.getType_of_identification() != null && client.getIdentification_number() != null && client.getName() != null && client.getLastname() != null &&
                client.getE_mail() != null ){//&& client.getBorn_date() != null
            newClient.setCreation_date_of_the_account(LocalDateTime.now());
            newClient.setLast_modification_date(LocalDateTime.now());
            newClient.setCreation_user("yo");
            return clientRepository.save(newClient);
        }else {
            return null;
        }*/
        return clientRepository.save(client);
    }

    @Override
    public Client updateClient(Client client) {
        return clientRepository.save(client);
    }

    @Override
    public boolean deleteClient(int id) {
        clientRepository.deleteById(id);
        return true;
    }

    @Override
    public boolean adultChecker(LocalDate born_date) {
        if (LocalDate.now().minusYears(18).getYear() > born_date.getYear()){
        return true;
        }else {
            return false;
        }
    }

    @Override
    public LocalDate calculateCreationDate() {
        return LocalDate.now();
    }

    @Override
    public boolean uncancelledProductsChecker() {
        return false;
    }

    @Override
    public List<Client> findAllClients() {
        return clientRepository.findAll();
    }

    @Override
    public Client findClientById(int id) {
        return clientRepository.findById(id).get();
    }
}
