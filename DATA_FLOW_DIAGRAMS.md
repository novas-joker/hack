# 📊 AMS: Detailed Data Flow Diagrams (DFD)

This document provides a granular view of how data moves through the Academic Management System (AMS) for every key module.

## 1. Level 0: Context Diagram
The Context Diagram shows the system as a single process interacting with external entities.

```mermaid
graph LR
    Student((Student))
    Staff((Staff))
    Advisor((Advisor))
    HOD((HOD))
    AMS[AMS System]

    Student -- "OD Requests, Grievances, Profile Edits" --> AMS
    Staff -- "Attendance Logs, Mark Entries" --> AMS
    Advisor -- "Section Approvals, Analytics Review" --> AMS
    HOD -- "Policy Updates, Grievance Resolution" --> AMS

    AMS -- "Attendance Status, Internals, Notifications" --> Student
    AMS -- "OD Approvals, Student Records" --> Staff
    AMS -- "Class Performance Reports" --> Advisor
    AMS -- "Departmental Analytics" --> HOD
```

---

## 2. Level 1: Core Process Migration
Detailed view of internal system processes and data stores.

```mermaid
graph TD
    User((User))
    P1[Authentication & Authorization]
    P2[Attendance & OD Management]
    P3[Academic Marks Engine]
    P4[Grievance Portal]
    
    DB_User[(User Store)]
    DB_Attd[(Attendance/OD Store)]
    DB_Marks[(Marks Store)]
    DB_Comp[(Complaints Store)]

    User -- "Credentials" --> P1
    P1 -- "Session Token" --> User
    P1 <--> DB_User

    User -- "Marking/Requesting" --> P2
    P2 <--> DB_Attd
    P2 -- "Attendance Data" --> P3

    User -- "Marks Entry" --> P3
    P3 <--> DB_Marks

    User -- "Submission/Status" --> P4
    P4 <--> DB_Comp
```

---

## 3. Level 2: Sub-Process Details

### **3.1 Attendance & OD Lifecycle**
How student presence and "On-Duty" requests are synchronized.

```mermaid
flowchart TD
    S1[Staff marks Student as ABSENT]
    S2[Student submits OD Request + Proof]
    P1{HOD/Advisor Reviews}
    P2[Update DB Status: OD]
    P3[Attendance Percentage Recalculated]
    
    S1 --> DB[(Attendance DB)]
    S2 --> DB_OD[(OD Storage)]
    DB_OD --> P1
    P1 -- "Approved" --> P2
    P2 --> DB
    DB --> P3
    P3 --> UI[Student Dashboard Update]
```

### **3.2 Academic Marks & Analytics Flow**
The logic behind weighted internal calculations.

```mermaid
flowchart LR
    Staff((Staff))
    M1[CAT 1 Marks]
    M2[CAT 2 Marks]
    AT[Attendance %]
    Calc[Logic Engine: 40/40/20]
    Final[Internal Total / 50]
    
    Staff --> M1 & M2
    DB_Attd[(Attendance)] --> AT
    M1 & M2 & AT --> Calc
    Calc --> Final
    Final --> DB_Marks[(Marks DB)]
```

### **3.3 Grievance Redressal (Privacy Flow)**
Data flow for identified vs. anonymous complaints.

```mermaid
flowchart TD
    User((Student))
    T1{Anonymous?}
    P1[Strip User Metadata]
    P2[Attach Student ID]
    Queue[Resolution Queue]
    HOD((HOD / Staff))

    User --> T1
    T1 -- "Yes" --> P1
    T1 -- "No" --> P2
    P1 & P2 --> Queue
    Queue --> HOD
    HOD -- "Update Status" --> DB[(Complaint DB)]
    DB -- "Notification" --> User
```

---

## 4. Data Dictionary (Key Flows)

| Flow Name | Description | Source Process | Destination Process | Data Elements |
| :--- | :--- | :--- | :--- | :--- |
| **Auth Request** | User login attempt | Login Form | Auth Service | Email, Password |
| **Attendance Sync** | Real-time presence update | Staff List | DB & Stud. Dashboard | StudentID, Status, Date |
| **OD Payload** | "On-Duty" application data | OD Form | Staff Reviewer | Dates, Reason, Proof Image |
| **Internal Grade** | Final calculated mark | Calculation Logic | Marks Table | CAT1, CAT2, AttdScore, Total |
| **Grievance Pkt** | Submitted complaint | Complaint Form | Resolution Process | Category, Text, Meta(Optional) |
