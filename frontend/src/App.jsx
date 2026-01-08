import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import { ToastProvider } from './context/ToastContext';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardLayout from './components/DashboardLayout';
import StudentDashboard from './pages/StudentDashboard';
import StudentAttendance from './pages/StudentAttendance';
import StudentMarks from './pages/StudentMarks';
import StudentComplaints from './pages/StudentComplaints';
import StudentProfile from './pages/StudentProfile';
import StaffDashboard from './pages/StaffDashboard';
import StaffAttendance from './pages/StaffAttendance';
import StaffODRequests from './pages/StaffODRequests';
import StaffComplaints from './pages/StaffComplaints';
import AdvisorDashboard from './pages/AdvisorDashboard';
import AdvisorStudents from './pages/AdvisorStudents';
import HodDashboard from './pages/HodDashboard';

// Staff / HOD Placeholders
const AdvisorAllocation = () => <DashboardLayout><h1>Subject Allocation</h1><p>Advisor View</p></DashboardLayout>;
const AdvisorPerformance = () => <DashboardLayout><h1>Class Performance</h1><p>Advisor View</p></DashboardLayout>;

function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<LoginPage />} />

            {/* STUDENT ROUTES */}
            <Route path="/student/dashboard" element={
              <ProtectedRoute allowedRoles={['STUDENT']}>
                <DashboardLayout>
                  <StudentDashboard />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            <Route path="/student/attendance" element={
              <ProtectedRoute allowedRoles={['STUDENT']}>
                <DashboardLayout>
                  <StudentAttendance />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            <Route path="/student/marks" element={
              <ProtectedRoute allowedRoles={['STUDENT']}>
                <DashboardLayout>
                  <StudentMarks />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            <Route path="/student/complaints" element={
              <ProtectedRoute allowedRoles={['STUDENT']}>
                <DashboardLayout>
                  <StudentComplaints />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            <Route path="/student/profile" element={
              <ProtectedRoute allowedRoles={['STUDENT']}>
                <DashboardLayout>
                  <StudentProfile />
                </DashboardLayout>
              </ProtectedRoute>
            } />

            {/* STAFF ROUTES */}
            <Route path="/staff/dashboard" element={
              <ProtectedRoute allowedRoles={['STAFF']}>
                <DashboardLayout>
                  <StaffDashboard />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            <Route path="/staff/attendance" element={
              <ProtectedRoute allowedRoles={['STAFF']}>
                <DashboardLayout>
                  <StaffAttendance />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            <Route path="/staff/od-requests" element={
              <ProtectedRoute allowedRoles={['STAFF']}>
                <DashboardLayout>
                  <StaffODRequests />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            <Route path="/staff/complaints" element={
              <ProtectedRoute allowedRoles={['STAFF']}>
                <DashboardLayout>
                  <StaffComplaints />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            <Route path="/advisor/dashboard" element={
              <ProtectedRoute allowedRoles={['ADVISOR']}>
                <DashboardLayout>
                  <AdvisorDashboard />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            <Route path="/advisor/students" element={
              <ProtectedRoute allowedRoles={['ADVISOR']}>
                <DashboardLayout>
                  <AdvisorStudents />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            <Route path="/advisor/analytics" element={
              <ProtectedRoute allowedRoles={['ADVISOR']}>
                <DashboardLayout>
                  <AdvisorPerformance />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            <Route path="/hod/dashboard" element={
              <ProtectedRoute allowedRoles={['HOD']}>
                <DashboardLayout>
                  <HodDashboard />
                </DashboardLayout>
              </ProtectedRoute>
            } />

            {/* Catch all */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ToastProvider>
  );
}

export default App;
