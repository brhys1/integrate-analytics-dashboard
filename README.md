# Integrate Healthcare Analytics Dashboard

Analytics Dashboard for a healthcare analytics dashboard built for **Integrate Healthcare**, a University of Michigan–based startup. The platform enables **hospital administrators** to track billing, claims, and operational data in a centralized, easy-to-understand interface.

---

## Goals and Objectives

- Build a scalable web-based dashboard to visualize hospital billing, operations, and claims data.
- Enable real-time insights for administrative decision-making for hospital administrators.

---

## Tech Stack

### Backend
- Java  
- Spring Boot  
- Spring Data JPA  
- PostgreSQL

### Frontend
- Next.js  
- Tailwind CSS  
- Tableau (analytics visualizations)

### Cloud Infrastructure
- AWS RDS for PostgreSQL database hosting  

---

## Data Model

The data had **four core relational tables**, migrated from legacy CSV files to PostgreSQL:

1. **billing_transactions** – individual billing and payment records  
2. **claims** – insurance claim submissions and statuses  
3. **insurance_payers** – payer data and contact information  
4. **patient_insurance** – patient insurance data

---

## Architecture

```

Frontend (Next.js + Tableau)
↓ HTTP
Spring Boot REST API
↓ JPA / Hibernate
PostgreSQL (AWS RDS)

```

The backend follows a layered architecture:
- Controllers for API exposure    
- Repositories for database access via Spring Data JPA  

## API Endpoints

The backend exposes RESTful endpoints to support frontend dashboards and visualizations:

```

GET /api/billing/transactions
GET /api/billing/claims
GET /api/billing/insurance-payers
GET /api/billing/patient-insurance

```

## Frontend

The frontend is built using **Next.js** and **Tailwind CSS** and serves as the primary interface for hospital administrators. It consumes data from the backend REST APIs and presents key billing, claims, and operational metrics in a clear, interactive format.

Data is fetched from the backend using client-side requests and React hooks, enabling the dashboard to stay up to date with the database.

For more analytics and visualization, the frontend integrates with **Tableau**, which is used to create charts and dashboards based on the backend-provided datasets.

---

## Design Decisions

### Why PostgreSQL instead of CSVs?
- CSV parsing on every request does not scale and introduces file I/O overhead.

### Why AWS RDS?
- Provides a PostgreSQL instance that the entire backend team can access consistently.
- Removes operational overhead by handling backups, monitoring, and availability automatically.

---

## Local Setup

### Backend
1. Run the backend:
   ```bash
   mvn spring-boot:run
   ````

2. The API will be available at:

   ```
   http://localhost:8080
   ```

### Frontend

1. Install dependencies:

   ```bash
   npm install
   ```
2. Start the development server:

   ```bash
   npm run dev
   ```
3. The frontend will connect to the backend APIs for live data.

---

## Team

- **Project Manager:** Rhys Burman 
- **Analysts:** Rayan Kamdem, Ajay Wadhwani, Mariam Mandwee, Akram Oudeif, Jainam Patel, Jessica Ni
