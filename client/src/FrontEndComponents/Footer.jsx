import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../styles/footer.css";

const Footer = () => {
  return (
    <footer className="footer bg-light text-center py-3 mt-auto" >
      <div style={{ paddingTop: "10px"}}>
      <Container >
      <Row className="align-items-center">
        <Row md={2} style={{ textAlign: "left" }}>
        <p className="text-muted">&copy; 2025 AMC. All Rights Reserved.</p>
        </Row>
        <Col md={6} style={{ textAlign: "left" }}>
          <p className="text-muted"><a href="/home">Home</a></p>
        </Col>
        <Col md={6} style={{ textAlign: "right" }}>
          <p className="text-muted"><a href="/MyComplaints">My Complaints</a></p>
        </Col>
        <Col md={6} style={{ textAlign: "left" }}>
          <p className="text-muted"><a href="/Contact">Help and Support</a></p>
        </Col>
        <Col md={6} style={{ textAlign: "right" }}>
          <p className="text-muted"><a href="/AboutUsNew">About Us</a></p>
        </Col>
      </Row>
        
      </Container>
      </div>
    </footer>
  );
};

export default Footer;
