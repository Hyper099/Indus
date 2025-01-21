import React, { useEffect } from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import axios from "axios";
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
        localStorage.removeItem("token");
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
    <Navbar bg="primary" variant="dark" expand="lg" className="fixed-header shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/home" className="fw-bold fs-4 text-white">
          AMC
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            <Nav.Link as={Link} to="/home" className="text-white me-3">
              &#127968; Home
            </Nav.Link>
            <Nav.Link as={Link} to="/ComplaintForm" className="text-white me-3">
              &#9998; Complaint Registration
            </Nav.Link>
            <Nav.Link as={Link} to="/MyComplaints" className="text-white me-3">
              &#9888; My Complaints
            </Nav.Link>
            <Nav.Link as={Link} to="/Support" className="text-white me-3">
              &#10067; Help and Support
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

export default Header;
