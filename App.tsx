
import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { UserRole } from './types';

// Page Imports
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HeuristicsPage from './pages/HeuristicsPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import DashboardPage from './pages/DashboardPage';
import ThreatDetectionPage from './pages/ThreatDetectionPage';
import IncidentManagementPage from './pages/IncidentManagementPage';
import ForensicsCasePanel from './pages/ForensicsCasePanel';
import UserManagementPage from './pages/UserManagementPage';
import IntelligenceFeedPage from './pages/IntelligenceFeedPage';
import Layout from './components/Layout';

// Enhanced ProtectedRoute with Role-Based Access Control (RBAC)
const ProtectedRoute: React.FC<{ 
  children: React.ReactNode; 
  allowedRoles?: UserRole[];
}> = ({ children, allowedRoles }) => {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-950 text-white font-mono uppercase tracking-[0.5em] animate-pulse">
        Neural Link Establishing...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/heuristics" element={<HeuristicsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          
          {/* Authenticated Platform Routes */}
          <Route path="/app" element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }>
            <Route index element={<Navigate to="/app/dashboard" replace />} />
            <Route path="dashboard" element={<DashboardPage />} />
            
            <Route path="threats" element={
              <ProtectedRoute allowedRoles={[UserRole.SOC, UserRole.INT]}>
                <ThreatDetectionPage />
              </ProtectedRoute>
            } />
            
            <Route path="incidents" element={
              <ProtectedRoute allowedRoles={[UserRole.SOC, UserRole.DFIR]}>
                <IncidentManagementPage />
              </ProtectedRoute>
            } />
            
            <Route path="forensics" element={
              <ProtectedRoute allowedRoles={[UserRole.DFIR]}>
                <ForensicsCasePanel />
              </ProtectedRoute>
            } />

            <Route path="intelligence" element={
              <ProtectedRoute allowedRoles={[UserRole.INT]}>
                <IntelligenceFeedPage />
              </ProtectedRoute>
            } />

            <Route path="users" element={
              <ProtectedRoute allowedRoles={[UserRole.SYS]}>
                <UserManagementPage />
              </ProtectedRoute>
            } />
          </Route>

          {/* Access Control View */}
          <Route path="/unauthorized" element={
            <div className="h-screen flex flex-col items-center justify-center bg-slate-950 text-white text-center p-6">
              <div className="w-24 h-24 bg-rose-500/10 border border-rose-500/20 rounded-full flex items-center justify-center text-4xl mb-6 shadow-2xl shadow-rose-500/20">🚫</div>
              <h1 className="text-3xl font-black mb-2 uppercase tracking-widest">Clearance Invalid</h1>
              <p className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.3em] max-w-sm">
                Your operator credentials do not have authorization for this sector. 
                Contact a System Administrator (SYS) to request clearance escalation.
              </p>
              <button 
                onClick={() => window.history.back()} 
                className="mt-8 px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-black text-xs uppercase tracking-widest shadow-xl shadow-indigo-600/20 transition-all active:scale-95"
              >
                Return to Station
              </button>
            </div>
          } />

          {/* Fallback Redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
