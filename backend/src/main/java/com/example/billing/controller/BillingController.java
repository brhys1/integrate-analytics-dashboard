package com.example.billing.controller;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.FileReader;
import java.io.IOException;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/billing")
public class BillingController {

    private static final DateTimeFormatter DATE_TIME_FORMATTER = 
        DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
    private static final DateTimeFormatter DATE_FORMATTER = 
        DateTimeFormatter.ofPattern("yyyy-MM-dd");

    @Value("${csv.billing.transactions.path}")
    private String billingTransactionsPath;

    @Value("${csv.claims.path}")
    private String claimsPath;

    @Value("${csv.insurance.payers.path}")
    private String insurancePayersPath;

    @Value("${csv.patient.insurance.path}")
    private String patientInsurancePath;

    // Endpoints

    @GetMapping("/transactions")
    public ResponseEntity<List<BillingTransaction>> getBillingTransactions() {
        try {
            List<BillingTransaction> transactions = parseBillingTransactions(billingTransactionsPath);
            return ResponseEntity.ok(transactions);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/claims")
    public ResponseEntity<List<Claim>> getClaims() {
        try {
            List<Claim> claims = parseClaims(claimsPath);
            return ResponseEntity.ok(claims);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/insurance-payers")
    public ResponseEntity<List<InsurancePayer>> getInsurancePayers() {
        try {
            List<InsurancePayer> payers = parseInsurancePayers(insurancePayersPath);
            return ResponseEntity.ok(payers);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/patient-insurance")
    public ResponseEntity<List<PatientInsurance>> getPatientInsurance() {
        try {
            List<PatientInsurance> insurances = parsePatientInsurance(patientInsurancePath);
            return ResponseEntity.ok(insurances);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // CSV Parsing Methods

    private List<BillingTransaction> parseBillingTransactions(String filePath) throws IOException {
        List<BillingTransaction> transactions = new ArrayList<>();
        
        try (FileReader reader = new FileReader(filePath);
             CSVParser csvParser = new CSVParser(reader, 
                 CSVFormat.DEFAULT.builder()
                     .setHeader()
                     .setSkipHeaderRecord(true)
                     .setIgnoreHeaderCase(true)
                     .setTrim(true)
                     .build())) {
            
            for (CSVRecord record : csvParser) {
                BillingTransaction transaction = new BillingTransaction();
                transaction.setId(record.get("id"));
                transaction.setEncounterId(record.get("encounter_id"));
                transaction.setClaimId(record.get("claim_id"));
                transaction.setTransactionType(record.get("transaction_type"));
                transaction.setTransactionDatetime(LocalDateTime.parse(record.get("transaction_datetime"), DATE_TIME_FORMATTER));
                transaction.setAmount(new BigDecimal(record.get("amount")));
                transaction.setDescription(record.get("description"));
                transaction.setPaymentMethod(record.get("payment_method"));
                transaction.setReferenceNumber(record.get("reference_number"));
                transaction.setCreatedAt(LocalDateTime.parse(record.get("created_at"), DATE_TIME_FORMATTER));
                transaction.setUpdatedAt(LocalDateTime.parse(record.get("updated_at"), DATE_TIME_FORMATTER));
                
                transactions.add(transaction);
            }
        }
        
        return transactions;
    }

    private List<Claim> parseClaims(String filePath) throws IOException {
        List<Claim> claims = new ArrayList<>();
        
        try (FileReader reader = new FileReader(filePath);
             CSVParser csvParser = new CSVParser(reader, 
                 CSVFormat.DEFAULT.builder()
                     .setHeader()
                     .setSkipHeaderRecord(true)
                     .setIgnoreHeaderCase(true)
                     .setTrim(true)
                     .build())) {
            
            for (CSVRecord record : csvParser) {
                Claim claim = new Claim();
                claim.setId(record.get("id"));
                claim.setEncounterId(record.get("encounter_id"));
                claim.setPayerId(record.get("payer_id"));
                claim.setClaimNumber(record.get("claim_number"));
                claim.setSubmissionDate(LocalDate.parse(record.get("submission_date"), DATE_FORMATTER));
                claim.setServiceDateFrom(LocalDate.parse(record.get("service_date_from"), DATE_FORMATTER));
                claim.setServiceDateTo(LocalDate.parse(record.get("service_date_to"), DATE_FORMATTER));
                claim.setTotalCharges(new BigDecimal(record.get("total_charges")));
                claim.setTotalPayments(new BigDecimal(record.get("total_payments")));
                claim.setTotalAdjustments(new BigDecimal(record.get("total_adjustments")));
                claim.setBalanceDue(new BigDecimal(record.get("balance_due")));
                claim.setClaimStatus(record.get("claim_status"));
                claim.setCreatedAt(LocalDateTime.parse(record.get("created_at"), DATE_TIME_FORMATTER));
                claim.setUpdatedAt(LocalDateTime.parse(record.get("updated_at"), DATE_TIME_FORMATTER));
                
                claims.add(claim);
            }
        }
        
        return claims;
    }

    private List<InsurancePayer> parseInsurancePayers(String filePath) throws IOException {
        List<InsurancePayer> payers = new ArrayList<>();
        
        try (FileReader reader = new FileReader(filePath);
             CSVParser csvParser = new CSVParser(reader, 
                 CSVFormat.DEFAULT.builder()
                     .setHeader()
                     .setSkipHeaderRecord(true)
                     .setIgnoreHeaderCase(true)
                     .setTrim(true)
                     .build())) {
            
            for (CSVRecord record : csvParser) {
                InsurancePayer payer = new InsurancePayer();
                payer.setId(record.get("id"));
                payer.setPayerName(record.get("payer_name"));
                payer.setPayerType(record.get("payer_type"));
                payer.setContactPhone(record.get("contact_phone"));
                payer.setContactEmail(record.get("contact_email"));
                payer.setAddressLine1(record.get("address_line1"));
                payer.setAddressLine2(record.get("address_line2"));
                payer.setCity(record.get("city"));
                payer.setState(record.get("state"));
                payer.setZipCode(record.get("zip_code"));
                payer.setIsActive(Boolean.parseBoolean(record.get("is_active")));
                
                payers.add(payer);
            }
        }
        
        return payers;
    }

    private List<PatientInsurance> parsePatientInsurance(String filePath) throws IOException {
        List<PatientInsurance> insurances = new ArrayList<>();
        
        try (FileReader reader = new FileReader(filePath);
             CSVParser csvParser = new CSVParser(reader, 
                 CSVFormat.DEFAULT.builder()
                     .setHeader()
                     .setSkipHeaderRecord(true)
                     .setIgnoreHeaderCase(true)
                     .setTrim(true)
                     .build())) {
            
            for (CSVRecord record : csvParser) {
                PatientInsurance insurance = new PatientInsurance();
                insurance.setId(record.get("id"));
                insurance.setPatientId(Integer.parseInt(record.get("patient_id")));
                insurance.setInsuranceId(record.get("insurance_id"));
                insurance.setPolicyNumber(record.get("policy_number"));
                insurance.setGroupNumber(record.get("group_number"));
                insurance.setPlanType(record.get("plan_type"));
                insurance.setSubscriberName(record.get("subscriber_name"));
                insurance.setSubscriberRelationship(record.get("subscriber_relationship"));
                insurance.setEffectiveDate(LocalDate.parse(record.get("effective_date"), DATE_FORMATTER));
                insurance.setTerminationDate(LocalDate.parse(record.get("termination_date"), DATE_FORMATTER));
                insurance.setPriorityOrder(Integer.parseInt(record.get("priority_order")));
                insurance.setCopayAmount(new BigDecimal(record.get("copay_amount")));
                insurance.setDeductibleAmount(new BigDecimal(record.get("deductible_amount")));
                insurance.setIsActive(Boolean.parseBoolean(record.get("is_active")));
                insurance.setCreatedAt(LocalDateTime.parse(record.get("created_at"), DATE_TIME_FORMATTER));
                insurance.setUpdatedAt(LocalDateTime.parse(record.get("updated_at"), DATE_TIME_FORMATTER));
                
                insurances.add(insurance);
            }
        }
        
        return insurances;
    }

    // Model Classes

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class BillingTransaction {
        private String id;
        private String encounterId;
        private String claimId;
        private String transactionType;
        
        @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
        private LocalDateTime transactionDatetime;
        
        private BigDecimal amount;
        private String description;
        private String paymentMethod;
        private String referenceNumber;
        
        @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
        private LocalDateTime createdAt;
        
        @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
        private LocalDateTime updatedAt;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Claim {
        private String id;
        private String encounterId;
        private String payerId;
        private String claimNumber;
        
        @JsonFormat(pattern = "yyyy-MM-dd")
        private LocalDate submissionDate;
        
        @JsonFormat(pattern = "yyyy-MM-dd")
        private LocalDate serviceDateFrom;
        
        @JsonFormat(pattern = "yyyy-MM-dd")
        private LocalDate serviceDateTo;
        
        private BigDecimal totalCharges;
        private BigDecimal totalPayments;
        private BigDecimal totalAdjustments;
        private BigDecimal balanceDue;
        private String claimStatus;
        
        @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
        private LocalDateTime createdAt;
        
        @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
        private LocalDateTime updatedAt;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class InsurancePayer {
        private String id;
        private String payerName;
        private String payerType;
        private String contactPhone;
        private String contactEmail;
        private String addressLine1;
        private String addressLine2;
        private String city;
        private String state;
        private String zipCode;
        private Boolean isActive;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class PatientInsurance {
        private String id;
        private Integer patientId;
        private String insuranceId;
        private String policyNumber;
        private String groupNumber;
        private String planType;
        private String subscriberName;
        private String subscriberRelationship;
        
        @JsonFormat(pattern = "yyyy-MM-dd")
        private LocalDate effectiveDate;
        
        @JsonFormat(pattern = "yyyy-MM-dd")
        private LocalDate terminationDate;
        
        private Integer priorityOrder;
        private BigDecimal copayAmount;
        private BigDecimal deductibleAmount;
        private Boolean isActive;
        
        @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
        private LocalDateTime createdAt;
        
        @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
        private LocalDateTime updatedAt;
    }
}