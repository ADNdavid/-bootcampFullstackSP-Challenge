package com.adndavid.adnbank.service;

import com.adndavid.adnbank.entity.FinancialMovement;

import java.util.List;

public interface FinancialMovementService {

    //main methods:
    public FinancialMovement createTransaction(FinancialMovement financialMovement);
    public float calculateGmf();
    public float calculateCurrentBalance();
    public float calculateAvailableBalance();


    //validation methods:
    public boolean accountExistenceChecker();

    //optional methods:
    public List<FinancialMovement> findFinancialMovements(long accountNumber);
}
