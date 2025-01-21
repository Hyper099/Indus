import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import "../styles/maincontent.css";

const MainContent = () => {
  return (
    <Container className="main-content mt-5">
      <Row className="justify-content-center text-center">
        <Col xs={12} md={8}>
          <h1 className="fw-bold text-primary">Tell us about your Problems</h1>
          <p className="text-muted">
            We are here to assist you with all your complaints and queries.
          </p>
        </Col>
      </Row>
      <Row className="mt-4 text-center">
        <Col xs={6}>
          <Button variant="primary" className="w-100 fw-bold">
            Instructions
          </Button>
        </Col>
        <Col xs={6}>
          <Button variant="secondary" className="w-100 fw-bold">
            Upload Documents
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default MainContent;
