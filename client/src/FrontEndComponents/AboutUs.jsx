import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import bg1 from '../Graphics/LandingPageBg.jpg';

const AboutUsNew = () => {
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
            // can change the image here - Vedesh
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
            <Col md={7} style={{ textAlign: "left" }}>
              <h1 style={{ fontWeight: "bold", fontSize: "36px", color: "#0056b3" }}>
                About Us
              </h1>
            </Col>
          </Row>
        </Container>
      </div>
      {/* Don't know if this carousel looks good */}
      {/* <Carousel>
            <Carousel.Item>
            <div
                style={{
                  height: "300px",
                  backgroundImage: `url(${car1})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  color: "#0056b3",
                  textAlign: "center",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Carousel.Caption>
                <h3>First slide label</h3>
                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
            </div>
            </Carousel.Item>
            <Carousel.Item>
            <div
                style={{
                  height: "300px",
                  backgroundImage: `url(${car1})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  color: "#fff",
                  textAlign: "center",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Carousel.Caption>
                <h3>First slide label</h3>
                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
            </div>
        </Carousel.Item>
        <Carousel.Item>
        <div
                style={{
                  height: "300px",
                  backgroundImage: `url(${car1})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  color: "#fff",
                  textAlign: "center",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Carousel.Caption>
                <h3>First slide label</h3>
                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
            </div>
        </Carousel.Item>
        </Carousel> */}
      <Container style={{ position: "relative", zIndex: 2 }}>
        <Row className="align-items-center">
          {/* <Col md={6} style={{ textAlign: "center" }}> */}
          <p style={{ textAlign: "left", padding: "50px 0", fontSize: "18px" }}>
            Welcome to AMC Complaint Portal, your trusted partner in enhancing civic
            engagement and making our city a better place to live.
            We are dedicated to bridging the gap between citizens and municipal authorities by providing an efficient,
            user-friendly, and transparent platform for reporting and resolving public grievances.
          </p>
          {/* </Col> */}

        </Row>
        <Row className="my-5">
          <Col md={6}>
            <Card style={{ border: '1px solid #ddd', padding: '20px' }}>
              <Card.Body>
                <Card.Title style={{ fontSize: '24px', fontWeight: 'bold' }}>How are we different?</Card.Title>
                <Card.Text style={{ fontSize: '16px', color: '#495057' }}>
                  <li>End-to-End Complaint Resolution</li>
                  <p style={{ marginLeft: '20px' }}>
                    Unlike traditional methods, where complaints often get lost in paperwork, our platform ensures that
                    every complaint is assigned to the appropriate department, monitored for resolution, and escalated if necessary.
                    From field staff to senior officials, our system tracks progress to guarantee timely action.
                  </p>
                  <li>Category-Based Mapping</li>
                  <p style={{ marginLeft: '20px' }}>
                    Our intuitive system helps categorize
                    grievances automatically using smart tools, ensuring they reach the right department without delays.
                    Whether it’s a road issue, garbage disposal, or water leakage, we’ve got you covered.</p>
                  <li>Reopen Unresolved Complaints</li>
                  <p style={{ marginLeft: '20px' }}>
                    Dissatisfied with the solution? Citizens can reopen
                    complaints seamlessly and have them addressed again.
                    No more frustration from incomplete resolutions.</p>
                  <li>Emergency Alerts</li>
                  <p style={{ marginLeft: '20px' }}>
                    Beyond grievances, we provide real-time warnings
                    in case of emergencies like floods or natural disasters, keeping you informed and safe.
                  </p>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card style={{ border: '1px solid #ddd', padding: '20px' }}>
              <Card.Body>
                <Card.Title style={{ fontSize: '24px', fontWeight: 'bold' }}>Convenience at Its Core</Card.Title>
                <Card.Text style={{ fontSize: '16px', color: '#495057' }}>
                  <li>Simplified Reporting Process</li>
                  <p style={{ marginLeft: '20px' }}>
                    Say goodbye to lengthy forms and office visits! Our platform enables users to report issues in
                    minutes. Upload a photo, write a description, and select the category—it’s that simple.
                  </p>
                  <li>Real-Time Updates</li>
                  <p style={{ marginLeft: '20px' }}>
                    Get notified about the status of your complaint via SMS or the app itself. No more chasing authorities for updates.
                  </p>
                  <li>Anywhere, Anytime Access</li>
                  <p style={{ marginLeft: '20px' }}>
                    Whether you’re at home or on the go, our web and mobile-friendly app lets you report issues from anywhere,
                    ensuring convenience and accessibility.
                  </p>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="my-5">
          <Col md={6}>
            <Card style={{ border: '1px solid #ddd', padding: '20px' }}>
              <Card.Body>
                <Card.Title style={{ fontSize: '24px', fontWeight: 'bold' }}>Why Is It Better Than Conventional Methods?</Card.Title>
                <Card.Text style={{ fontSize: '16px', color: '#495057' }}>
                  <li>Eliminates Bureaucracy</li>
                  <p style={{ marginLeft: '20px' }}>
                    Conventional methods often involve navigating through
                    layers of bureaucracy, causing delays.
                    Our streamlined platform ensures direct communication with the concerned authorities, cutting through the red tape.
                  </p>
                  <li>No Physical Presence Needed</li>
                  <p style={{ marginLeft: '20px' }}>
                    No need to visit offices or stand in long queues. Report problems online, saving your time and effort.
                  </p>
                  <li>Data-Driven Efficiency</li>
                  <p style={{ marginLeft: '20px' }}>
                    With our platform, authorities can prioritize complaints based
                    on urgency levels, improving response times and resource allocation.
                  </p>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card style={{ border: '1px solid #ddd', padding: '20px' }}>
              <Card.Body>
                <Card.Title style={{ fontSize: '24px', fontWeight: 'bold' }}>How Do We Ensure Security?</Card.Title>
                <Card.Text style={{ fontSize: '16px', color: '#495057' }}>
                  <li>Data Privacy</li>
                  <p style={{ marginLeft: '20px' }}>
                    Your personal details, complaint descriptions, and photos are encrypted
                    and stored securely in our database, ensuring they are accessible only to authorized personnel.
                  </p>
                  <li>Role-Based Access Control</li>
                  <p style={{ marginLeft: '20px' }}>
                    Our system ensures that data is shared only with relevant authorities
                    responsible for addressing your grievance, maintaining confidentiality at every step.
                  </p>
                  <li>Regular Audits</li>
                  <p style={{ marginLeft: '20px' }}>
                    We conduct regular security checks and updates to keep the platform
                    secure against vulnerabilities and unauthorized access.
                  </p>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>


    </div>
  )
}

export default AboutUsNew;