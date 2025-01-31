import React from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";

import img4 from '../Graphics/Garbage.jpeg';
import img9 from '../Graphics/others.jpg';
import img1 from '../Graphics/pollution.jpg';
import img3 from '../Graphics/RoadAndTraffic.jpg';
import img5 from '../Graphics/Sewage.jpg';
import img2 from '../Graphics/stayAnimals.jpg';
import img6 from '../Graphics/Streetlight.jpg';
import img7 from '../Graphics/Theft.jpg';
import img8 from '../Graphics/waterBodies.jpg';

const issueCategories = [
  {
    title: "Pollution",
    image: img1,
    description: "Air, water, or noise pollution affecting public health.",
    formLink: "/ComplaintForm?category=pollution",
  },
  {
    title: "Stray Animals",
    image: img2,
    description: " Uncontrolled stray dogs, cattle, or other animals causing nuisance",
    formLink: "/ComplaintForm?category=stray-animals",
  },
  {
    title: "Road And Traffic",
    image: img3,
    description: "Potholes, broken roads, or other road problems.",
    formLink: "/ComplaintForm?category=roads",
  },
  {
    title: "Garbage Collection",
    image: img4,
    description: "Delayed or missed waste pickup leading to unhygienic conditions.",
    formLink: "/ComplaintForm?category=garbage",
  },
  {
    title: "Sewage And Drainage",
    image: img5,
    description: " Blocked or overflowing drains causing waterlogging and foul odor",
    formLink: "/ComplaintForm?category=garbage",
  },
  {
    title: "Streetlights",
    image: img6,
    description: "Non-functional or broken streetlights leading to safety concerns",
    formLink: "/ComplaintForm?category=garbage",
  },
  {
    title: "Theft",
    image: img7,
    description: "Incidents of robbery, chain snatching, or vehicle theft in public areas.",
    formLink: "/ComplaintForm?category=garbage",
  },
  {
    title: "Contaminated Water Bodies",
    image: img8,
    description: " Polluted lakes, rivers, or water sources affecting the environment.",
    formLink: "/ComplaintForm?category=garbage",
  },
  {
    title: "Other Issue",
    image: img9,
    description: "Potholes, broken roads, or other road problems.",
    formLink: "/ComplaintForm?category=garbage",
  },
];

const HomePageCategories = () => {
  const cardStyle = {
    border: "2px solid #0047AB", // Government blue
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    marginBottom: "20px",
  };

  const buttonStyle = {
    backgroundColor: "#0047AB", // Government blue
    border: "none",
    fontWeight: "bold",
  };

  const imageStyle = {
    height: "150px", // Fixed height
    width: "100%", // Full width of the card
    objectFit: "cover", // Maintain aspect ratio while cropping
    borderTopLeftRadius: "10px", // Match card's border radius
    borderTopRightRadius: "10px", // Match card's border radius
   
    
  };

  return (
    <Container style={{ marginTop: "30px", padding: "20px", borderRadius: "50px" }}>
      <h1 style={{ color: "#0047AB", textAlign: "center", marginBottom: "30px" }}>
        Register Your Complaint
      </h1>
      <Row>
        {issueCategories.map((category, index) => (
          <Col key={index} sm={12} md={6} lg={3}>
            <Card style={cardStyle}>
              <Card.Img
                variant="top"
                src={category.image}
                alt={category.title}
                style={imageStyle} // Inline styling applied here
              />
              <Card.Body>
                <Card.Title style={{ color: "#0047AB" }}>{category.title}</Card.Title>
                <Card.Text>{category.description}</Card.Text>
                <Button style={buttonStyle} href={category.formLink}>
                  Register
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default HomePageCategories;
