package com.adndavid.adnbank.service;

import com.adndavid.adnbank.entity.FinancialMovement;
import com.adndavid.adnbank.repository.FinancialMovementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FinancialMovementServiceImplementation implements FinancialMovementService{

    @Autowired
    FinancialMovementRepository financialMovementRepository;

    @Override
    public FinancialMovement createTransaction(FinancialMovement financialMovement) {
        return financialMovementRepository.save(financialMovement);
    }

    @Override
    public List<FinancialMovement> findFinancialMovements(long accountNumber) {
        return financialMovementRepository.findMovementsByAccountNumber(accountNumber);
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
