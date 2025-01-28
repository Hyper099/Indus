import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AdminDashboard from './Admin/AdminDashboard';
import AdminHeader from "./Admin/AdminHeader";
import ManageComplaints from './Admin/ManageComplaints';
import ManageUsers from './Admin/ManageUsers';
import App from './App';
import { AuthProvider, useAuth } from './AuthContext';
import Login from './Authentication/Login';
import RegisterForm from './Authentication/Register';
import ComplaintForm from './ComplaintForm';
import Contact from './FrontEndComponents/Contact';
import Header from "./FrontEndComponents/Header";
import MyComplaints from './FrontEndComponents/MyComplaints';
import Home from './Home';
import Notifications from './FrontEndComponents/Notfications';
import ProtectedRoute from './ProtectedRoute';
import './styles/index.css';

// Create a root container for React 18
const root = ReactDOM.createRoot(document.getElementById('root')); // Ensure the ID matches the one in your index.html

const AppRoutes = () => {
  const { user } = useAuth(); // Access user from AuthContext

  const renderHeader = () => {
    if (user && user.role === 'admin') {
      return <AdminHeader />;
    }
    return <Header />;
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              {renderHeader()}
              <App />
            </>
          }
        />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/ComplaintForm"
          element={
            <>
              {renderHeader()}
              <ComplaintForm />
            </>
          }
        />
        <Route
          path="/MyComplaints"
          element={
            <>
              {renderHeader()}
              <MyComplaints />
            </>
          }
        />
        <Route
          path="/Contact"
          element={
            <>
              {renderHeader()}
              <Contact />
            </>
          }
        />
        <Route path="/notifications" element={
          <>
          {renderHeader()}
          <Notifications /></>} />

        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <>
                {renderHeader()}
                <Home />
              </>
            </ProtectedRoute>
          }
        />
        <Route
          path="/AdminDashboard"
          element={
            <ProtectedRoute>
              <>
                <AdminHeader />
                <AdminDashboard />
              </>
            </ProtectedRoute>
          }
        />
        <Route
          path="/AdminDashboard/complaints"
          element={
            <ProtectedRoute>
              <>
                <AdminHeader />
                <ManageComplaints />
              </>
            </ProtectedRoute>
          }
        />
        <Route
          path="/AdminDashboard/users"
          element={
            <ProtectedRoute>
              <>
                <AdminHeader />
                <ManageUsers />
              </>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

root.render(
  <React.StrictMode>
    <AuthProvider> {/* Wrap the entire app with AuthProvider */}
      <AppRoutes />
    </AuthProvider>
  </React.StrictMode>
);
