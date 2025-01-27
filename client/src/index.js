import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';
import ReactDOM from 'react-dom/client'; // Import 'react-dom/client' for React 18
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'; // Import React Router components
import AdminDashboard from './Admin/AdminDashboard';
import App from './App';
import { AuthProvider } from './AuthContext'; // Import AuthProvider
import Login from './Authentication/Login';
import RegisterForm from './Authentication/Register';
import ComplaintForm from './ComplaintForm';
import Contact from './FrontEndComponents/Contact';
import Header from "./FrontEndComponents/Header"; // Import your Header component
import MyComplaints from './FrontEndComponents/MyComplaints';
import Home from './Home';
import ProtectedRoute from './ProtectedRoute';
import './styles/index.css';

// Create a root container for React 18
const root = ReactDOM.createRoot(document.getElementById('root')); // Ensure the ID matches the one in your index.html

root.render(
  <React.StrictMode>
    <AuthProvider> {/* Wrap the entire app with AuthProvider */}
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header /> {/* Header renders dynamically */}
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
                <Header />
                <ComplaintForm />
              </>
            }
          />
          <Route
            path="/MyComplaints"
            element={
              <>
                <Header />
                <MyComplaints />
              </>
            }
          />
          <Route
            path="/Contact"
            element={
              <>
                <Header />
                <Contact />
              </>
            }
          />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <>
                  <Header />
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
                  <Header />
                  <AdminDashboard />
                </>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  </React.StrictMode>
);
