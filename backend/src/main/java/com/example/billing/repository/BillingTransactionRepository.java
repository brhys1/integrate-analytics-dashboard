package com.example.billing.repository;

import com.example.billing.entity.BillingTransaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BillingTransactionRepository extends JpaRepository<BillingTransaction, String> {
    
}