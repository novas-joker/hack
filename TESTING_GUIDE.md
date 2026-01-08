# 🧪 Academic Management System (AMS): Master Testing Guide

This document is the official QA protocol for the AMS platform. It covers everything from basic navigation to complex state management and network exceptions.

---

## 🚦 Pre-Test Information

### **Test Credentials (Mock System)**
| Role | Email | Password |
| :--- | :--- | :--- |
| **Student** | `student@college.edu` | `pwd123` |
| **Staff** | `staff@college.edu` | `pwd123` |
| **Advisor** | `advisor@college.edu` | `pwd123` |
| **HOD** | `hod@college.edu` | `pwd123` |

---

## 🔐 1. Authentication & Security

### **1.1 Login Resilience**
- **Test Case:** Valid Login (Student).
  *   *Step:* Enter `student@college.edu` / `pwd123`. Click "Sign In".
  *   *Expected:* Navbar renders role "STUDENT", Redirect to `/student/dashboard`, Toast: "Welcome back!".
- **Test Case: Offline State.**
  *   *Step:* Set DevTools -> Network -> **Offline**. Click "Sign In".
  *   *Expected:* Spinner runs -> Red Toast: "Login failed. Please check your network connection." -> **Page does not change.**

---

## 🎓 2. Student Portal: Comprehensive Flows

### **2.1 Profile & Identity Management (New)**
- **Test Case: Photo Upload.**
  *   *Step:* Go to **My Profile** -> Click **Camera Icon**. Select an image.
  *   *Expected:* Image instantly replaces the initial avatar. Success Toast appears.
- **Test Case: Detail Editing.**
  *   *Step:* Click **"Edit Details"** on Personal Info card.
  *   *Step:* Change Phone Number and Address. Click **"Save Changes"**.
  *   *Expected:* Modal closes, UI updates instantly with new values. Success Toast appears.

### **2.2 Intelligent Notifications (New)**
- **Test Case: State Toggle.**
  *   *Step:* Open Notification Bell.
  *   *Expected:* Unread items have a blue tint and a red dot indicator.
- **Test Case: Mark All Read.**
  *   *Step:* Click **"Mark all read"**.
  *   *Expected:* Blue tints and red dots vanish. Unread count in header resets.
- **Test Case: Navigation Action.**
  *   *Step:* Click a "New Mark Released" notification.
  *   *Expected:* Panel closes automatically, redirects to `/student/marks`.

### **2.3 Attendance & OD Portal**
- **Test Case: Date Logic Error.**
  *   *Step:* OD Modal -> Set Jan 10 as Start and Jan 08 as End. Submit.
  *   *Expected:* Red Toast: "Start date cannot be after end date".
- **Test Case: Missing Proof.**
  *   *Step:* Fill all fields but do not upload a file. Submit.
  *   *Expected:* Red Toast: "Please attach a proof document".

---

## 👨‍🏫 3. Staff & Advisor Governance

### **3.1 Attendance Marking (Staff)**
- **Test Case: Real-time Counters.**
  *   *Step:* Toggle several students to "Absent".
  *   *Expected:* "Total Absent" counter in the top bar increments instantly.
- **Test Case: Cloud Sync Failure.**
  *   *Step:* Go Offline. Click **"Save Attendance"**.
  *   *Expected:* Red Toast: "Cloud sync failed. Check your internet connection."

### **3.2 Student Directory (Advisor - New)**
- **Test Case: Directory Search.**
  *   *Step:* Login as Advisor -> Go to **Student Profiles**.
  *   *Step:* Type "Priya" in search.
  *   *Expected:* Only Priya Iyer's card remains.
- **Test Case: Profile Drill-down.**
  *   *Step:* Click **"View Full Profile"** on a student card.
  *   *Expected:* Navigates to a detailed profile view for that specific student.

---

## 🏢 4. HOD Departmental Oversight

### **4.1 Department Dashboard.**
- **Test Case: Quick Access.**
  *   *Step:* Click "Faculty Analytics" card.
  *   *Expected:* Simulated navigation to departmental reports (HOD functionality verification).

---

## � 5. Final UX Checklist
- [ ] **Mobile Sidebar:** On small screens, does the Hamburger menu open/close correctly?
- [ ] **Breadcrumbs:** Navigating from Marks back to "Portal" (Home) works without refreshing.
- [ ] **Persistence:** Does the profile photo remain in state while navigating between student pages? (Frontend state check).

---
*Last Verified: January 08, 2026*
