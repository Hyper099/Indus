// src/FrontEndComponents/AdminHeader.js
import axios from "axios";
import React, { useEffect } from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import "../styles/navbar.css";

const AdminHeader = () => {
   const { user, setUser } = useAuth();
   const navigate = useNavigate();

   useEffect(() => {
      const fetchUserData = async () => {
         const token = localStorage.getItem("token");

         if (!token) {
            setUser(null);
            return;
         }

         try {
            const response = await axios.get("http://localhost:3001/home", {
               headers: { token },
            });
            setUser(response.data);
            console.log(user);
         } catch {
            setUser(null);
         }
      };

      fetchUserData();
   }, [setUser]);

   const handleLogout = () => {
      localStorage.removeItem("token");
      setUser(null);
      navigate("/login");
   };

   return (
      <Navbar bg="dark" variant="dark" expand="lg" className="fixed-header shadow-sm">
         <Container>
            <Navbar.Brand as={Link} to="/adminDashboard" className="fw-bold fs-4 text-white">
               Admin Dashboard
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
               <Nav className="ms-auto align-items-center">
                  <Nav.Link as={Link} to="/adminDashboard" className="text-white me-3">
                     <i className="fa-regular fa-tachometer-alt"></i> Dashboard
                  </Nav.Link>
                  <Nav.Link as={Link} to="/adminDashboard/complaints" className="text-white me-3">
                     <i className="fa-solid fa-bell"></i> Manage Complaints
                  </Nav.Link>
                  <Nav.Link as={Link} to="/adminDashboard/users" className="text-white me-3">
                     <i className="fa-solid fa-users"></i> Manage Users
                  </Nav.Link>
                  {user ? (
                     <>
                        <span className="text-white me-3">Welcome, {user.name}</span>
                        <Button variant="outline-light" onClick={handleLogout} className="me-2">
                           Logout
                        </Button>
                     </>
                  ) : (
                     <>
                        <Button as={Link} to="/login" variant="outline-light" className="me-2">
                           Sign In
                        </Button>
                        <Button as={Link} to="/register" variant="light" className="text-primary fw-bold">
                           Sign Up
                        </Button>
                     </>
                  )}
               </Nav>
            </Navbar.Collapse>
         </Container>
      </Navbar>
   );
};

export default AdminHeader;
