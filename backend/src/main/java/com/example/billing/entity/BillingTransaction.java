package com.example.billing.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "billing_transactions")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class BillingTransaction {
    
    @Id
    private String id;
    
    @Column(name = "encounter_id")
    private String encounterId;
    
    @Column(name = "claim_id")
    private String claimId;
    
    @Column(name = "transaction_type")
    private String transactionType;
    
    @Column(name = "transaction_datetime")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime transactionDatetime;
    
    private BigDecimal amount;
    private String description;
    
    @Column(name = "payment_method")
    private String paymentMethod;
    
    @Column(name = "reference_number")
    private String referenceNumber;
    
    @Column(name = "created_at")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime updatedAt;
}