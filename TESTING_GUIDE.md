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
  *   *Step:* Click the **User Info Card** (above Logout) in the sidebar -> Click **Camera Icon**. Select an image.
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

### **3.1 Staff Efficiency**
- **Test Case: Quick Dashboard Navigation.**
  *   *Step:* On Staff Dashboard, click the "Pending OD Requests" stat card.
  *   *Expected:* Navigates instantly to `/staff/od-requests`.
- **Test Case: Table Row Interaction.**
  *   *Step:* In "At-Risk Students" table, click the `ChevronRight` icon on a student row.
  *   *Expected:* Blue Toast: "Opening performance record for [Name]...".
- **Test Case: Quick OD Approval.**
  *   *Step:* In "Pending ODs" sidebar, click "Approve" on a request.
  *   *Expected:* Navigates to the full OD Requests portal for final processing.

### **3.2 Advisor Hub (New)**
- **Test Case: Student Lookup.**
  *   *Step:* On Advisor Dashboard, type a name in the "Student Lookup" search box and hit **Enter**.
  *   *Expected:* Navigates to the full Student Directory page.
- **Test Case: Class Performance Log.**
  *   *Step:* Go to **Class Analytics** in FA sidebar.
  *   *Expected:* High-level charts (Pass rates, GPA distribution) render with progress bars.

---

## 🏢 4. HOD Departmental Oversight

### **4.1 Department Intelligence**
- **Test Case: Section Overview.**
  *   *Step:* Go to **Departmental Data** -> Search for "2-B".
  *   *Expected:* Shows Class 2-B with Advisor Dr. John Doe.
- **Test Case: Faculty Rank.**
  *   *Step:* On HOD Dashboard, check **Faculty Academic Performance**.
  *   *Expected:* High performers (e.g., Dr. Sarah Wilson) show 96% pass rate with emerald progress bars.

---

## 🛠️ 5. Final UX Checklist
- [x] **Sidebar User Card:** Does clicking the user name/avatar above Logout navigate to the correct role-based profile?
- [x] **Breadcrumbs:** Navigating from Analytics back to Dashboard works smooth.
- [x] **Coming Soon:** Check "Subject Allocation" route -> Does it show the Construction icon and "feature coming soon" message?

---
*Last Verified: January 08, 2026*
