import React from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import image1 from "../Graphics/Image1.jpeg";
import image2 from "../Graphics/image2.jpeg";
import image3 from "../Graphics/image3.jpeg";

const AboutUs = () => {
  return (
    <section style={{ backgroundColor: '#f8f9fa', padding: '40px 0' }}>
      <Container>
        <Row>
          <Col md={12} className="text-center">
            <h2 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '20px' }}>About Us</h2>
            <p style={{ fontSize: '18px', color: '#6c757d', maxWidth: '800px', margin: '0 auto' }}>
              Welcome to the AMC Complaint Portal. This website was created to streamline the process of
              lodging complaints to the Ahmedabad Municipal Corporation. Our goal is to make it easier for
              citizens to report issues and stay informed about their resolution. Whether it's related to
              road conditions, public services, or infrastructure issues, we are here to ensure that your
              voice is heard and actions are taken swiftly.
            </p>
          </Col>
        </Row>
        <Row className="my-5">
          <Col md={6}>
            <Card style={{ border: '1px solid #ddd', padding: '20px' }}>
              <Card.Body>
                <Card.Title style={{ fontSize: '24px', fontWeight: 'bold' }}>Why Choose Us?</Card.Title>
                <Card.Text style={{ fontSize: '16px', color: '#495057' }}>
                  Unlike other complaint portals, we offer a direct and transparent way to track the status
                  of your complaints in real-time. Our system ensures that complaints are directed to the
                  relevant departments, and our user-friendly interface makes the process simple and quick.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card style={{ border: '1px solid #ddd', padding: '20px' }}>
              <Card.Body>
                <Card.Title style={{ fontSize: '24px', fontWeight: 'bold' }}>Our Commitment</Card.Title>
                <Card.Text style={{ fontSize: '16px', color: '#495057' }}>
                  We are committed to providing timely responses and regular updates for every complaint
                  lodged. Our goal is to ensure that citizens receive the necessary assistance and
                  improvements in their communities without delays.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="my-5">
          <Col md={12} className="text-center">
            <h3 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '20px' }}>Gallery</h3>
            <Row>
              <Col md={4}>
                <img src={image1} alt="Image 1" style={{ width: '100%', borderRadius: '8px' }} />
              </Col>
              <Col md={4}>
                <img src={image2} alt="Image 2" style={{ width: '100%', borderRadius: '8px' }} />
              </Col>
              <Col md={4}>
                <img src={image3} alt="Image 3" style={{ width: '100%', borderRadius: '8px' }} />
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="text-center">
          <Col md={12}>
            <Button variant="primary" style={{ fontSize: '18px', padding: '10px 30px' }}>
              Report a Complaint
            </Button>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AboutUs;
