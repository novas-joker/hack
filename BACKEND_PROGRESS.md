# 🛠️ Backend Progress Report: Academic Management System (AMS)

## 📦 Project Overview
- **Runtime:** Node.js
- **Framework:** Express.js
- **ORM:** Prisma
- **Database:** PostgreSQL
- **Security:** JWT Authentication + Role-Based Access Control (RBAC)

---

## ✅ Completed Modules

### **1. Core Infrastructure**
- [x] **Prisma Schema:** Defined models for `User`, `Subject`, `Attendance`, `ODRequest`, `Marks`, and `Complaint`.
- [x] **Database Seeding:** `seed.js` implemented with default roles (HOD, STAFF, ADVISOR, STUDENT).
- [x] **Authentication Logic:** JWT generation and `authenticate`/`authorize` middleware.

### **2. API Routers**
- [x] **Auth Router (`/auth`):** Login and registration endpoints.
- [x] **Dashboard Router (`/dashboard`):** Role-specific data aggregation for HOD, Staff, and Students.
- [x] **Marks Router (`/marks`):** 
  - Staff: Update CAT1/CAT2 marks (triggers automatic `attendanceScore` and `internalTotal` calculation).
  - Student: View personal marks.
- [x] **Attendance Router (`/attendance`):** 
  - Staff: Bulk marking and viewing.
  - Student: View personal attendance stats.
- [x] **OD Request Router (`/od`):** Submit and update (Approve/Reject) OD workflows.
- [x] **Complaint Router (`/complaint`):** Anonymous grievance registration and tracking.

---

## ⚠️ Current Blockers
- [ ] **Dependency Issue:** `npm install` failing due to Prisma engine binary download error (`ECONNRESET`). 
- [ ] **Local DB Sync:** Database hasn't been migrated locally yet due to the Prisma installation failure.
- [ ] **Deployment:** Backend is currently local-only.

---

## 🚧 Pending Tasks
- [ ] **Staff Allocation:** Logic for HOD to assign staff to specific subjects/classes.
- [ ] **Timetable Management:** Database support for session-wise schedules.
- [ ] **Email Notifications:** Automatic alerts for OD approvals and low attendance warnings.
- [ ] **End-Sem Results:** Module for uploading and viewing university results (G.P.A calculation).

---
*Last Updated: January 08, 2026*
