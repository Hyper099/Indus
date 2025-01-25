import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, ProgressBar, Row } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

function ComplaintForm() {
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [urgency, setUrgency] = useState('');
  const [setPhoto] = useState(null);
  const [contact, setContact] = useState({ name: '', email: '', phone: '' });
  const [address, setAddress] = useState('');
  const [landmark, setLandmark] = useState('');
  const [preferredContact, setPreferredContact] = useState('');
  const [area, setArea] = useState('');
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please log in to file a complaint.");
        navigate("/login");
        return;
      }

      try {
        const response = await axios.get("http://localhost:3001/home", {
          headers: {
            token: `${token}`,
          },
        });
        const { name, email } = response.data;
        setContact((prev) => ({ ...prev, name, email }));
      } catch (err) {
        console.error("Error fetching user details:", err);
      }
    };

    fetchUserDetails();
  }, [navigate]);

  useEffect(() => {
    const filledFields = [category, description, urgency, address, area, landmark, preferredContact].filter(Boolean).length;
    setProgress((filledFields / 7) * 100);
  }, [category, description, urgency, address, area, landmark, preferredContact]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/ComplaintForm', {
      category,
      description,
      urgency,
      contact,
      address,
      landmark,
      preferredContact,
      area
    })
      .then(result => {
        console.log(result);
        alert("Complaint Registered Successfully.");
        navigate("/MyComplaints");
      })
      .catch(err => console.error("Error submitting complaint:", err));
  };

  return (
    <Container
      fluid
      style={{
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#f8f9fa',
        minHeight: '100vh',
        paddingTop: '20px',
        paddingBottom: '40px',
      }}
    >
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <h3
            className="text-center mb-4"
            style={{
              color: '#004085',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              borderBottom: '2px solid #004085',
              paddingBottom: '10px',
            }}
          >
            Register a Complaint
          </h3>



          <Form
            onSubmit={handleSubmit}
            style={{
              backgroundColor: '#ffffff',
              border: '1px solid #ced4da',
              padding: '20px',
              borderRadius: '8px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            }}
          >
            {/* Category */}
            <Form.Group controlId="formCategory" className="mb-3">
              <Form.Label style={{ fontWeight: 'bold' }}>Category</Form.Label>
              <Form.Control
                as="select"
                onChange={(e) => setCategory(e.target.value)}
                value={category}
                required
              >
                <option>Choose a category...</option>
                <option value="Road Repair">Road Repair</option>
                <option value="Garbage Collection">Garbage Collection</option>
                <option value="Water Supply">Water Supply</option>
                <option value="Pollution (Air, Water, Noise)">Pollution (Air, Water, Noise)</option>
                <option value="Stray Animals">Stray Animals</option>
                <option value="Roads and Traffic">Roads and Traffic</option>
                <option value="Drainage and Water">Drainage and Water</option>
                <option value="Trash">Trash</option>
                <option value="Streetlights">Streetlights</option>
                <option value="Contaminated Water Bodies">Contaminated Water Bodies</option>
                <option value="Mosquitoes">Mosquitoes</option>
              </Form.Control>
            </Form.Group>

            {/* Description */}
            <Form.Group controlId="formDescription" className="mb-3">
              <Form.Label style={{ fontWeight: 'bold' }}>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                required
              />
            </Form.Group>

            {/* Urgency Level */}
            <Form.Group controlId="formUrgency" className="mb-3">
              <Form.Label style={{ fontWeight: 'bold' }}>Urgency Level</Form.Label>
              <Form.Control
                as="select"
                onChange={(e) => setUrgency(e.target.value)}
                value={urgency}
                required
              >
                <option>Choose urgency...</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </Form.Control>
            </Form.Group>

            {/* Photo Upload */}
            <Form.Group controlId="formPhoto" className="mb-3">
              <Form.Label style={{ fontWeight: 'bold' }}>Upload Photo</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => setPhoto(e.target.files[0])}
                required
              />
            </Form.Group>

            {/* Contact Details */}
            <Form.Group controlId="formContact" className="mb-3">
              <Form.Label style={{ fontWeight: 'bold' }}>Contact Details</Form.Label>
              <Form.Control
                type="text"
                placeholder="Name"
                value={contact.name}
                disabled
                style={{ marginBottom: '10px' }}
              />
              <Form.Control
                type="email"
                placeholder="Email"
                value={contact.email}
                disabled
                style={{ marginBottom: '10px' }}
              />
              <Form.Control
                type="text"
                placeholder="Phone"
                onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                value={contact.phone}
                required
              />
            </Form.Group>

            {/* Address */}
            <Form.Group controlId="formAddress" className="mb-3">
              <Form.Label style={{ fontWeight: 'bold' }}>Address</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                onChange={(e) => setAddress(e.target.value)}
                value={address}
                required
              />
            </Form.Group>

            {/* Landmark */}
            <Form.Group controlId="formLandmark" className="mb-3">
              <Form.Label style={{ fontWeight: 'bold' }}>Landmark</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setLandmark(e.target.value)}
                value={landmark}
                required
              />
            </Form.Group>

            {/* Area */}
            <Form.Group controlId="formArea" className="mb-3">
              <Form.Label style={{ fontWeight: 'bold' }}>Area</Form.Label>
              <Form.Control
                as="select"
                onChange={(e) => setArea(e.target.value)}
                value={area}
                required
              >
                <option>Choose an area...</option>
                <option value="Shahpur">Shahpur</option>
                <option value="Dariapur">Dariapur</option>
                <option value="Jamalpur">Jamalpur</option>
                <option value="Khadia">Khadia</option>
              </Form.Control>
            </Form.Group>

            {/* Preferred Contact Method */}
            <Form.Group controlId="formPreferredContact" className="mb-3">
              <Form.Label style={{ fontWeight: 'bold' }}>Preferred Contact Method</Form.Label>
              <Form.Control
                as="select"
                onChange={(e) => setPreferredContact(e.target.value)}
                value={preferredContact}
                required
              >
                <option>Choose a method...</option>
                <option value="Email">Email</option>
                <option value="Phone">Phone</option>
              </Form.Control>
            </Form.Group>
            
          {/* Sticky Progress Bar */}
          <div
  style={{
    position: 'sticky', // Changed from 'sticky' to 'fixed'
    top: 0,
    zIndex: 10,
    width: '100%', // Ensure it spans the entire width
    backgroundColor: '#f8f9fa',
    padding: '10px 0',
    borderBottom: '1px solid #ddd',

  }}
>
  <ProgressBar
    now={progress}
    label={`${Math.round(progress)}%`}
    style={{
      height: '25px',
      fontWeight: 'bold',
      backgroundColor: '#e9ecef',
      border: '1px solid #ced4da',
      
    }}
  />
</div>
            {/* Submit Button */}
            <Button
              variant="primary"
              type="submit"
              className="w-100"
              style={{ fontWeight: 'bold', fontSize: '18px' }}
            >
              Submit Complaint
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default ComplaintForm;
