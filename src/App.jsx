import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { theme } from './theme';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/Layout';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Vehicles from './pages/Vehicles';
import AddVehicle from './pages/AddVehicle';
import FuelLog from './pages/FuelLog';
import Expenses from './pages/Expenses';
import ServiceHistory from './pages/ServiceHistory';

function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="loading-screen" style={{ backgroundColor: theme.background }}>
        <div className="spinner" />
      </div>
    );
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <Layout>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/vehicles" element={<Vehicles />} />
                <Route path="/add-vehicle" element={<AddVehicle />} />
                <Route path="/fuel-log" element={<FuelLog />} />
                <Route path="/expenses" element={<Expenses />} />
                <Route path="/service-history" element={<ServiceHistory />} />
              </Routes>
            </Layout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}
