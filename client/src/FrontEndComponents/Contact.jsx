import React from 'react';
import { Accordion } from "react-bootstrap";
import Image from 'react-bootstrap/Image';
import flowchart from '../Graphics/FLOWCHART.png';
const faqs = [
  {
    title: "How long does it take to resolve a complaint.",
    body: "It generally depends on the level of complaint (low,medium,high) , complaint with the highest priority will be resolved first."
  },
  {
    title: "What process should I follow if I want to lodge multiple complaints.",
    body: "You will have to lodge for each complaint seperately. For more details refer 'How to lodge a complaint'."
  },
  {
    title: "Is uploading photos/documents a necessity?",
    body: "Yes, if you upload photos/documents then we will be able to measure the severity of the complaint."
  },
  {
    title: "Do the photo/documents have to be of particular size?",
    body: "No, a particular size is not required."
  },
  {
    title: "How to know the status of the complaint?",
    body: "Users will be updated about the status of the complaint via email or sms, or they can track it live on the webApp under the tab 'MyComplaints'."
  },


]

function HelpAndSupport() {
  const containerStyle = {
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f8f9fa',
    padding: '20px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    maxWidth: '900px',
    margin: '20px auto',
  };

  const headerStyle = {
    textAlign: 'center',
    color: '#003366',
    fontWeight: 'bold',
    marginBottom: '50px',
    textTransform: 'uppercase',
  };

  const sectionHeaderStyle = {
    color: '#0056b3',
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '5px',
    marginTop: '30px',
    textDecoration: 'underline',
  };

  const paragraphStyle = {
    lineHeight: '1.6',
    marginBottom: '15px',
  };

  const accordionHeaderStyle = {
    backgroundColor: '#e6e6e6',
    padding: '10px',
    fontWeight: 'bold',
    cursor: 'pointer',
    border: '1px solid #ddd',
  };

  const accordionBodyStyle = {
    backgroundColor: '#ffffff',
    padding: '10px',
    border: '1px solid #ddd',
    borderTop: 'none',
  };

  const feedbackFormStyle = {
    backgroundColor: '#ffffff',
    padding: '15px',
    border: '1px solid #ddd',
    borderRadius: '5px',
  };

  const buttonStyle = {
    backgroundColor: '#003366',
    color: '#ffffff',
    border: 'none',
    padding: '10px 20px',
    cursor: 'pointer',
    textTransform: 'uppercase',
    borderRadius: '5px',
  };

  const listStyle = {
    marginLeft: '20px',
  };

  return (
    <div style={containerStyle}>
      <h2 style={headerStyle}>Help & Support</h2>

      <section>
        <h3 style={sectionHeaderStyle}>WebApp Map</h3>
        <Image src={flowchart} fluid />
      </section>

      {/* Guidelines Section */}
      <section>
        <h3 style={sectionHeaderStyle}>Guidelines</h3>
        <div>
          <div style={accordionHeaderStyle}>How to Lodge a Complaint</div>
          <div style={accordionBodyStyle}>
            <ol style={listStyle}>
              <li>Log in to your account using your registered email and password.</li>
              <li>Navigate to the "Lodge Complaint" page from the menu.</li>
              <li>
                Fill out the complaint form with:
                <ul style={listStyle}>
                  <li>Contact information (email and phone).</li>
                  <li>Description of the issue.</li>
                  <li>Supporting images or documents (optional).</li>
                </ul>
              </li>
              <li>Click "Submit" to lodge your complaint.</li>
              <li>You’ll receive a confirmation email with a unique complaint ID.</li>
            </ol>
          </div>
          <div style={accordionHeaderStyle}>How to Track Your Complaint</div>
          <div style={accordionBodyStyle}>
            <ol style={listStyle}>
              <li>Log in to your account using your registered email and password.</li>
              <li>Go to the "My Complaints" section from the menu.</li>
              <li>Find a list of all submitted complaints.</li>
              <li>Click on a complaint to view its status and admin updates.</li>
              <li>Contact support with your complaint ID if needed.</li>
            </ol>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section>
        <h3 style={{ marginBottom: '20px', marginTop: '40px' }}>FAQS</h3>
        <Accordion defaultActiveKey={null}>
          {faqs.map((faqs, index) => (
            <Accordion.Item

              eventKey={index}
              style={{
                marginBottom: "10px",
                border: "1px solid",

                borderRadius: "5px",
              }}
            >
              {/* Accordion Header */}
              <Accordion.Header
                style={{

                  padding: "10px 15px",
                  fontWeight: "bold",
                  borderTopLeftRadius: "5px",
                  borderTopRightRadius: "5px",
                }}
              >
                <div style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span>
                    {faqs.title}
                  </span>

                </div>

              </Accordion.Header>

              {/* Accordion Body */}
              <Accordion.Body
                style={{

                  padding: "15px",
                  borderBottomLeftRadius: "5px",
                  borderBottomRightRadius: "5px",
                }}
              >
                <p>
                  <strong></strong> {faqs.body}
                </p>


              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      </section>

      {/* Contact Support Section */}
      <section>
        <h3 style={sectionHeaderStyle}>Contact Support</h3>
        <p style={paragraphStyle}>
          For assistance, contact us via:
          <ul style={listStyle}>
            <li>Email: <a href="mailto:support@amccomplaints.com">support@amccomplaints.com</a></li>
            <li>Phone: +91-12345-67890</li>
          </ul>
        </p>
      </section>

      {/* Feedback Form Section */}
      <section style={feedbackFormStyle}>
        <h3 style={sectionHeaderStyle}>Submit Feedback</h3>
        <form>
          <div style={{ marginBottom: '15px' }}>
            <label>Name:</label>
            <br />
            <input type="text" style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label>Email:</label>
            <br />
            <input type="email" style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label>Feedback:</label>
            <br />
            <textarea style={{ width: '100%', padding: '8px', marginTop: '5px' }} rows="4"></textarea>
          </div>
          <button type="submit" style={buttonStyle}>Submit Feedback</button>
        </form>
      </section>
    </div>
  );
}

export default HelpAndSupport;
