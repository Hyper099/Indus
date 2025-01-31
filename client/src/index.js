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
import Footer from './FrontEndComponents/Footer';
import Header from "./FrontEndComponents/Header";
import MyComplaints from './FrontEndComponents/MyComplaints';
import Notifications from './FrontEndComponents/Notfications';
import Home from './Home';
import ProtectedRoute from './ProtectedRoute';
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

  const renderFooter = () => {
    if (user && user.role === 'admin') {
      return <></>;
    }
    return <Footer />;
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
              {renderFooter()}

            </>
          }
        />
        <Route
          path="/register"
          element={
            <>
              {renderHeader()}
              < RegisterForm />
            </>
          }

        />
        <Route
          path="/login"
          element={
            <>
              {renderHeader()}
              <Login />
            </>
          } />
        <Route
          path="/ComplaintForm"
          element={
            <>
              {renderHeader()}
              <ComplaintForm />
              {renderFooter()}
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
              {renderFooter()}
            </>
          }
        />
        <Route path="/notifications" element={
          <>
            {renderHeader()}
            <Notifications />
          </>} />

        <Route
          path="/AboutUsNew"
          element={
            <>
              {renderHeader()}
              <AboutUsNew />
              {renderFooter()}
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
                {renderFooter()}
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
