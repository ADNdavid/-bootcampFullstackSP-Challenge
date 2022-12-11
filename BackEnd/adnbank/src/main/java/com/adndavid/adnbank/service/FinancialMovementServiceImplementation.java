package com.adndavid.adnbank.service;

import com.adndavid.adnbank.entity.FinancialMovement;
import org.springframework.stereotype.Service;

@Service
public class FinancialMovementServiceImplementation implements FinancialMovementService{
    @Override
    public FinancialMovement createTransaction(FinancialMovement financialMovement) {
        return null;
    }

    @Override
    public float calculateGmf() {
        return 0;
    }

    @Override
    public float calculateCurrentBalance() {
        return 0;
    }

    @Override
    public float calculateAvailableBalance() {
        return 0;
    }

    @Override
    public boolean accountExistenceChecker() {
        return false;
    }
}
