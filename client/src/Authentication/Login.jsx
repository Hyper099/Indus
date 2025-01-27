import axios from "axios";
import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Determine the login URL based on admin or user
    const url = isAdmin
      ? "http://localhost:3001/adminLogin"
      : "http://localhost:3001/login";

    try {
      const response = await axios.post(url, { email, password });

      // Extract response data
      const { message, token, user } = response.data;

      if (message === "Success") {
        // Store the token in localStorage
        localStorage.setItem("token", token);

        // Navigate to the appropriate dashboard
        navigate(isAdmin ? "/adminDashboard" : "/home", { state: { user } });
      } else {
        // Show error if the login fails
        alert(response.data.message || "Login failed. Please try again.");
      }
    } catch (err) {
      console.error("Login error:", err);
      if (err.response && err.response.status === 401) {
        alert("Unauthorized: Invalid credentials.");
      } else {
        alert("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <h3 className="text-center mb-4">
            {isAdmin ? "Admin Login" : "User Login"}
          </h3>
          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">
              Login
            </Button>
          </Form>
          <div className="text-center mt-3">
            <p>
              {isAdmin ? (
                <>
                  Not an admin?{" "}
                  <Button
                    variant="link"
                    onClick={() => setIsAdmin(false)}
                    style={{ padding: 0 }}
                  >
                    User Login
                  </Button>
                </>
              ) : (
                <>
                  Admin?{" "}
                  <Button
                    variant="link"
                    onClick={() => setIsAdmin(true)}
                    style={{ padding: 0 }}
                  >
                    Admin Login
                  </Button>
                </>
              )}
            </p>
            {!isAdmin && (
              <p>
                Don't have an account?{" "}
                <Link to="/register">
                  <Button variant="link" style={{ padding: 0 }}>
                    Register
                  </Button>
                </Link>
              </p>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
