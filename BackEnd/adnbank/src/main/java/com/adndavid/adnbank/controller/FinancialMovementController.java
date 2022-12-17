package com.adndavid.adnbank.controller;


import com.adndavid.adnbank.entity.FinancialMovement;
import com.adndavid.adnbank.service.FinancialMovementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/movements")
@CrossOrigin("*")
public class FinancialMovementController {

    @Autowired
    private FinancialMovementService financialMovementService;
/*
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
*/
    @PostMapping
    public ResponseEntity<FinancialMovement> createMovement(@RequestBody FinancialMovement financialMovement){
        return new ResponseEntity<FinancialMovement>(financialMovementService.createTransaction(financialMovement), HttpStatus.CREATED);
    }



}
