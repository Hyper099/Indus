import axios from "axios";
import React, { useEffect } from "react";
import { Button, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import Emblem from "../Graphics/Emblem.png";
import "../styles/navbar.css";

const Header = () => {
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
      } catch {
        setUser(null);
      }
    };

    fetchUserData();
  }, [setUser]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };

  return (
    <Navbar bg="primary" variant="dark" expand="lg" className="fixed-header shadow-sm align-content-center">
      <Container>
        <Navbar.Brand as={Link} to="/home" className="fw-bold fs-4 text-white">
          <img
            src={Emblem}
            alt="AMC Logo"
            className="logo-image  mx-3 rounded "
            width="60"></img>
          AMC
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            <Nav.Link as={Link} to="/home" className="text-white me-3">
              <i className="fa-regular fa-house"></i> Home
            </Nav.Link>
            <Nav.Link as={Link} to="/AboutUsNew" className="text-white me-3">
              <i className="fa-regular fa-address-card"></i> About Us
            </Nav.Link>
            {user && (
              <>
                <NavDropdown title="Complaints" id="basic-nav-dropdown">
                  <NavDropdown.Item as={Link} to="/ComplaintForm" className="text-black me-3">
                   Complaint Registration
                </NavDropdown.Item>
                <NavDropdown.Item  as={Link} to="/MyComplaints" className="text-black me-3">
                   My Complaints
                   </NavDropdown.Item>
                </NavDropdown>
                
                
                <Nav.Link as={Link} to="/notifications" className="text-white me-3">
                  <i className="fa-regular fa-circle-exclamation"></i> Notifications
                </Nav.Link>
              </>
            )}
            <Nav.Link as={Link} to="/Contact" className="text-white me-3">
              <i className="fa-regular fa-question"></i> Help and Support
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
      <div id="google_translate_element" className="ms-auto"></div>
    </Navbar>
  );
};

export default Header;