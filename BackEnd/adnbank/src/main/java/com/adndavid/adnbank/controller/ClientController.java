package com.adndavid.adnbank.controller;

import com.adndavid.adnbank.entity.Client;
import com.adndavid.adnbank.service.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.websocket.server.PathParam;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/clients")
@CrossOrigin("*")
public class ClientController {

    @Autowired
    private ClientService clientService;

    @GetMapping("/{id}")
    public ResponseEntity<Client> findClientById(@PathVariable int id){
        try{
            return new ResponseEntity<Client>(clientService.findClientById(id),HttpStatus.OK);
        }catch (Exception exception){
            return new ResponseEntity<Client>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping
    public ResponseEntity<List<Client>> findAllClients(){
        return new ResponseEntity<>(clientService.findAllClients(),HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Client> createClient(@RequestBody Client client){
        return new ResponseEntity<Client>(clientService.createClient(client), HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Client> deleteClient(@PathVariable int id){
        //clientService.deleteClient(id);
        try{
            clientService.findClientById(id);
            clientService.deleteClient(id);
            return new ResponseEntity<Client>(HttpStatus.OK);

        }catch (Exception exception){
            return new ResponseEntity<Client>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateClient(@RequestBody Client client,@PathVariable int id){
        try{
            Client currentClient=clientService.findClientById(id);
            currentClient.setName(client.getName());
            currentClient.setLastname(client.getLastname());
            currentClient.setE_mail(client.getE_mail());

            clientService.updateClient(currentClient);

            return new ResponseEntity<Client>(HttpStatus.OK); //Revisar
        }catch (Exception exception){
            return new ResponseEntity<Client>(HttpStatus.NOT_FOUND);
        }
    }

}
