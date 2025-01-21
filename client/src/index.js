import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client'; // Import 'react-dom/client' for React 18
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'; // Import React Router components
import AdminHome from './Admin/AdminHome';
import AdminLogin from './Admin/AdminLogin';
import App from './App';
import { AuthProvider } from './AuthContext'; // Import AuthProvider
import Login from './Authentication/Login';
import RegisterForm from './Authentication/Register';
import ComplaintForm from './ComplaintForm';
import Header from "./FrontEndComponents/Header"; // Import your Header component
import Home from './Home';
import ProtectedRoute from './ProtectedRoute';
import './styles/index.css';

// Create a root container for React 18
const root = ReactDOM.createRoot(document.getElementById('root')); // Ensure the ID matches the one in your index.html

root.render(
  <React.StrictMode>
    <AuthProvider> {/* Wrap the entire app with AuthProvider */}
      <Router>
        {/* Header is always displayed */}
        <Header />

        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<Login />} />
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route path="/ComplaintForm" element={<ComplaintForm />} />

          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Adminhome"
            element={
              <ProtectedRoute>
                <AdminHome />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  </React.StrictMode>
);
