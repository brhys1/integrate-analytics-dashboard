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
@Table(name = "patient_insurance")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PatientInsurance {
    
    @Id
    private String id;
    
    @Column(name = "patient_id")
    private Integer patientId;
    
    @Column(name = "insurance_id")
    private String insuranceId;
    
    @Column(name = "policy_number")
    private String policyNumber;
    
    @Column(name = "group_number")
    private String groupNumber;
    
    @Column(name = "plan_type")
    private String planType;
    
    @Column(name = "subscriber_name")
    private String subscriberName;
    
    @Column(name = "subscriber_relationship")
    private String subscriberRelationship;
    
    @Column(name = "effective_date")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate effectiveDate;
    
    @Column(name = "termination_date")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate terminationDate;
    
    @Column(name = "priority_order")
    private Integer priorityOrder;
    
    @Column(name = "copay_amount")
    private BigDecimal copayAmount;
    
    @Column(name = "deductible_amount")
    private BigDecimal deductibleAmount;
    
    @Column(name = "is_active")
    private Boolean isActive;
    
    @Column(name = "created_at")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime updatedAt;
}
