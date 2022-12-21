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

    @GetMapping("/{accountNumber}")
    public ResponseEntity<List<FinancialMovement>> findFinancialMovements(@PathVariable long accountNumber){
        try{
            return new ResponseEntity<>(financialMovementService.findFinancialMovements(accountNumber), HttpStatus.OK);
        }catch (Exception exception){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping
    public ResponseEntity<FinancialMovement> createMovement(@RequestBody FinancialMovement financialMovement){
        return new ResponseEntity<FinancialMovement>(financialMovementService.createTransaction(financialMovement), HttpStatus.CREATED);
    }



}
