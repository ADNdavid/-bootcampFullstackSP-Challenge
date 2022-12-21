package com.adndavid.adnbank.repository;

import com.adndavid.adnbank.entity.FinancialMovement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface FinancialMovementRepository extends JpaRepository<FinancialMovement, Integer> {

    @Query(value="SELECT * FROM financial_movements WHERE (origin_product = ?1 or " +
            "target_product = ?1) and successful_transaction = true ORDER BY movement_date DESC;",nativeQuery = true)
    List<FinancialMovement> findMovementsByAccountNumber(long accountNumber);


}
