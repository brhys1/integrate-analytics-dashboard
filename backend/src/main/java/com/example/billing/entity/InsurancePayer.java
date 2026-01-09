package com.example.billing.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "insurance_payers")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class InsurancePayer {
    
    @Id
    private String id;
    
    @Column(name = "payer_name")
    private String payerName;
    
    @Column(name = "payer_type")
    private String payerType;
    
    @Column(name = "contact_phone")
    private String contactPhone;
    
    @Column(name = "contact_email")
    private String contactEmail;
    
    @Column(name = "address_line1")
    private String addressLine1;
    
    @Column(name = "address_line2")
    private String addressLine2;
    
    private String city;
    
    private String state;
    
    @Column(name = "zip_code")
    private String zipCode;
    
    @Column(name = "is_active")
    private Boolean isActive;
    
    @Column(name = "created_at")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime updatedAt;
}
