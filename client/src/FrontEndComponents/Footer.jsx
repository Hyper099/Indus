import React from "react";
import { Container } from "react-bootstrap";
import "./footer.css";

const Footer = () => {
  return (
    <footer className="footer bg-light text-center py-3 mt-auto">
      <Container>
        <p className="text-muted">&copy; 2023 AMC. All Rights Reserved.</p>
      </Container>
    </footer>
  );
};

export default Footer;
