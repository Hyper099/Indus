import React from "react";
import { Carousel, Col, Container, Row } from "react-bootstrap";
import RegisterForm from "../Authentication/Register";
import bg1 from '../Graphics/LandingPageBg.jpg'
import AboutUs from "./About";
import registerPage from '../Graphics/registerPage.png'
import myComplaints from '../Graphics/myComplaints.png';
import help from '../Graphics/help.png';
function LandingPage() {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", color: "#333" }}>
      {/* Header Section */}
      <div
        style={{
          backgroundColor: "#00008B",
          padding: "50px 0",
          position: "relative",
        }}
      >
        <div
          style={{
            backgroundImage: `url(${bg1})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(9px)",
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1,
          }}
        ></div>
        <Container style={{ position: "relative", zIndex: 2 }}>
          <Row className="align-items-center">
            <Col md={6} style={{ textAlign: "left" }}>
              <div style={{ padding: "20px" }}>
                <h1 style={{ fontWeight: "bold", fontSize: "36px", color: "#0056b3" }}>
                  Ahmedabad Municipal Corporation
                </h1>
                <p style={{ fontSize: "18px", marginTop: "20px" }}>
                  Welcome to the official portal for public complaint reporting and
                  monitoring. Register your complaints and track updates seamlessly.
                </p>
              </div>
            </Col>
            <Col md={6}>
              <div style={{ boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", padding: "20px", borderRadius: "8px", backgroundColor: "#ffffff" }}>
                <RegisterForm />
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Carousel Section */}
      <div style={{ backgroundColor: "#e9ecef", padding: "50px 0" }}>
        <Container>
          <h2 style={{ fontWeight: "bold", fontSize: "28px", textAlign: "center", marginBottom: "30px", color: "#0056b3" }}>
            Our Services
          </h2>
          <Carousel>
            <Carousel.Item>
              <div
                style={{
                  height: "400px",
                  backgroundImage: `url(${registerPage})`,
                  backgroundSize: "contain", // Ensures the whole image is visible
                  backgroundRepeat: "no-repeat", // Prevents repetition
                  backgroundPosition: "center", // Centers the image
                  backgroundColor: "#000", // Optional: Adds a fallback background
                  color: "#fff",
                  textAlign: "center",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div>
                  <h3 style={{ fontWeight: "bold" }}>Register a Complaint</h3>
                  <p>Log your concerns with ease.</p>
                </div>
              </div>
            </Carousel.Item>
            <Carousel.Item>
              <div
                style={{
                  height: "400px",
                  backgroundImage: `url(${myComplaints})`,
                  backgroundSize: "contain", // Ensures the whole image is visible
                  backgroundRepeat: "no-repeat", // Prevents repetition
                  backgroundPosition: "center", // Centers the image
                  backgroundColor: "#000", // Optional: Adds a fallback background
                  color: "#fff",
                  textAlign: "center",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div>
                  <h3 style={{ fontWeight: "bold" }}>My Complaints</h3>
                  <p>Track your complaint status in real-time.</p>
                </div>
              </div>
            </Carousel.Item>
            <Carousel.Item>
              <div
                style={{
                  height: "400px",
                  backgroundImage: `url(${help})`,
                  backgroundSize: "contain", // Ensures the whole image is visible
                  backgroundRepeat: "no-repeat", // Prevents repetition
                  backgroundPosition: "center", // Centers the image
                  backgroundColor: "#000", // Optional: Adds a fallback background
                  color: "#fff",
                  textAlign: "center",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div>
                  <h3 style={{ fontWeight: "bold" }}>Help and Support</h3>
                  <p>Get assistance whenever you need it.</p>
                </div>
              </div>
            </Carousel.Item>
          </Carousel>
        </Container>
      </div>
      <AboutUs/>
    </div>
  );
}

export default LandingPage;
