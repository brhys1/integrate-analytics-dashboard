package com.example.billing.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "claims")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Claim {
    
    @Id
    private String id;
    
    @Column(name = "encounter_id")
    private String encounterId;
    
    @Column(name = "payer_id")
    private String payerId;
    
    @Column(name = "claim_number")
    private String claimNumber;
    
    @Column(name = "submission_date")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate submissionDate;
    
    @Column(name = "service_date_from")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate serviceDateFrom;
    
    @Column(name = "service_date_to")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate serviceDateTo;
    
    @Column(name = "total_charges")
    private BigDecimal totalCharges;
    
    @Column(name = "total_payments")
    private BigDecimal totalPayments;
    
    @Column(name = "total_adjustments")
    private BigDecimal totalAdjustments;
    
    @Column(name = "balance_due")
    private BigDecimal balanceDue;
    
    @Column(name = "claim_status")
    private String claimStatus;
    
    @Column(name = "created_at")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime updatedAt;
}
