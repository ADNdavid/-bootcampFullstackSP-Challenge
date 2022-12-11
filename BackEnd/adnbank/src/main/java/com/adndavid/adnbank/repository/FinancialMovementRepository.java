package com.adndavid.adnbank.repository;

import com.adndavid.adnbank.entity.FinancialMovement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FinancialMovementRepository extends JpaRepository<FinancialMovement, Integer> {
}
