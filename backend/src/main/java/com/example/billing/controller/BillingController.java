package com.example.billing.controller;

import com.example.billing.entity.BillingTransaction;
import com.example.billing.entity.Claim;
import com.example.billing.entity.InsurancePayer;
import com.example.billing.entity.PatientInsurance;
import com.example.billing.repository.BillingTransactionRepository;
import com.example.billing.repository.ClaimRepository;
import com.example.billing.repository.InsurancePayerRepository;
import com.example.billing.repository.PatientInsuranceRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/billing")
@AllArgsConstructor
public class BillingController {

    private final BillingTransactionRepository billingTransactionRepository;
    private final ClaimRepository claimRepository;
    private final InsurancePayerRepository insurancePayerRepository;
    private final PatientInsuranceRepository patientInsuranceRepository;

    // Endpoints

    @GetMapping("/transactions")
    public ResponseEntity<List<BillingTransaction>> getBillingTransactions() {
        List<BillingTransaction> transactions = billingTransactionRepository.findAll();
        return ResponseEntity.ok(transactions);
    }

    @GetMapping("/claims")
    public ResponseEntity<List<Claim>> getClaims() {
        List<Claim> claims = claimRepository.findAll();
        return ResponseEntity.ok(claims);
    }

    @GetMapping("/insurance-payers")
    public ResponseEntity<List<InsurancePayer>> getInsurancePayers() {
        List<InsurancePayer> payers = insurancePayerRepository.findAll();
        return ResponseEntity.ok(payers);
    }

    @GetMapping("/patient-insurance")
    public ResponseEntity<List<PatientInsurance>> getPatientInsurance() {
        List<PatientInsurance> insurances = patientInsuranceRepository.findAll();
        return ResponseEntity.ok(insurances);
    }
}