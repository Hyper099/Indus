import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';
import ReactDOM from 'react-dom/client'; // Import 'react-dom/client' for React 18
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'; // Import React Router components
import AdminDashboard from './Admin/AdminDashboard';
// import ManageComplaints from './Admin/ManageComplaints'; // Example admin route
// import ManageUsers from './Admin/ManageUsers'; // Example admin route
import App from './App';
import { AuthProvider, useAuth } from './AuthContext'; // Import AuthProvider and useAuth
import Login from './Authentication/Login';
import RegisterForm from './Authentication/Register';
import ComplaintForm from './ComplaintForm';
import AdminHeader from "./Admin/AdminHeader"; // Import admin Header
import Contact from './FrontEndComponents/Contact';
import Header from "./FrontEndComponents/Header"; // Import user Header
import MyComplaints from './FrontEndComponents/MyComplaints';
import Home from './Home';
import ProtectedRoute from './ProtectedRoute'; // Import ProtectedRoute
import './styles/index.css';

import AboutUsNew from './FrontEndComponents/AboutUs';

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
          path="/AboutUsNew"
          element={
            <>
              {renderHeader()}
              <AboutUsNew />
            </>
          }
        />

        {/* <Route
          path="/AdminDashboard/complaints"
          element={
            <ProtectedRoute>
              <>
                <AdminHeader />
                <ManageComplaints />
              </>
            </ProtectedRoute>
          }
        /> */}
        {/* <Route
          path="/AdminDashboard/users"
          element={
            <ProtectedRoute>
              <>
                <AdminHeader />
                <ManageUsers />
              </>
            </ProtectedRoute>
          }
        /> */}
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
