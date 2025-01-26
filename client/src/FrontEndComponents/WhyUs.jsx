import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";

import whyUsImg1 from "../Graphics/others.jpg";
import whyUsImg2 from "../Graphics/pollution.jpg";

const WhyUsSection = () => {
  const sectionStyle = {
    marginLeft: "30px",
    padding: "20px",
  };

  const titleStyle = {
    color: "#0047AB", // Government blue
    textAlign: "center",
    marginBottom: "40px",
  };

  const textStyle = {
    fontSize: "18px",
    lineHeight: "1.5",
    textAlign: "justify", // Makes the text look more professional
  };

  const imageContainerStyle = {
    display: "flex",
    justifyContent: "center", // Center-aligns the image within the column
    alignItems: "center",
    padding: "15px", // Adds space around the image
  };

  const imageStyle = {
    maxWidth: "100%",
    height: "auto",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  };

  return (
    <Container style={sectionStyle}>
      <h2 style={titleStyle}>Why Us?</h2>
      <Row className="align-items-center mb-5">
        <Col md={6} style={imageContainerStyle}>
          <Image src={whyUsImg1} alt="Pollution issues" style={imageStyle} />
        </Col>
        <Col md={6}>
          <p style={textStyle}>
            Our platform is designed to bridge the gap between citizens and the municipal authorities,
            ensuring timely resolutions to pressing issues. Unlike traditional systems, which are often slow and lack transparency, 
            our complaint management system provides real-time updates and personalized tracking for each issue. 
            We empower citizens with a streamlined process to ensure their voices are heard.
          </p>
        </Col>
      </Row>
      <Row className="align-items-center mb-5">
        <Col md={6} className="order-md-2" style={imageContainerStyle}>
          <Image src={whyUsImg2} alt="Stray animal bites" style={imageStyle} />
        </Col>
        <Col md={6} className="order-md-1">
          <p style={textStyle}>
            Over the last few years, the rise in environmental pollution and stray animal-related incidents 
            has been alarming. Reports of stray animal bites and poor waste management are increasing, creating
            safety and health concerns for the public. Our solution prioritizes these critical issues by providing 
            a platform to report and monitor them efficiently.
          </p>
        </Col>
      </Row>
      <Row className="align-items-center">
        <Col md={6} style={imageContainerStyle}>
          <Image src={whyUsImg1} alt="Better solutions" style={imageStyle} />
        </Col>
        <Col md={6}>
          <p style={textStyle}>
            By leveraging technology, we aim to make Ahmedabad a cleaner, safer, and more sustainable city. 
            Our platform not only addresses immediate complaints but also provides insights into recurring problems 
            to help authorities implement long-term solutions. Together, we can work towards a city where citizens 
            thrive and public services excel.
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default WhyUsSection;
