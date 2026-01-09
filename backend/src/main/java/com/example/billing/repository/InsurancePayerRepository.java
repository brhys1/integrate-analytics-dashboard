package com.example.billing.repository;

import com.example.billing.entity.InsurancePayer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InsurancePayerRepository extends JpaRepository<InsurancePayer, String> {
    
}
