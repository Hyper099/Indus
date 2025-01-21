import axios from 'axios';
import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

function RegisterForm() {

  const navigate = useNavigate();
  const handleRegister = (e) => {
    e.preventDefault();
    console.log(name, email, password)
    axios.post('http://localhost:3001/register', { name, email, password })
      .then(result => {
        console.log(result)
        navigate('/login')
      })
      .catch(err => console.log(err))
    // Add logic to handle user registration
  };

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();


  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <h3 className="text-center mb-4">Register</h3>
          <Form onSubmit={handleRegister}>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                name="name"

                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Register
            </Button>
          </Form>

          <div className="text-center mt-3">
            <p>
              Already have an account?{" "}

              <Link to="/login">
                <Button

                  variant="link"

                  style={{ padding: 0 }}
                >
                  Login
                </Button>
              </Link>
            </p>
          </div>
          <div className="text-center mt-3">
            <p>
              Are you an admin?{" "}

              <Link to="/adminlogin">
                <Button

                  variant="link"

                  style={{ padding: 0 }}
                >
                  Admin Login
                </Button>
              </Link>
            </p>
          </div>
        </Col>
      </Row>

    </Container>
  );
}

export default RegisterForm;
