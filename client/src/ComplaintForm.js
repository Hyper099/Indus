import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';

function ComplaintForm() {
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [urgency, setUrgency] = useState('');
  const [photo, setPhoto] = useState(null);
  const [contact, setContact] = useState({ name: '', email: '', phone: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/ComplaintForm', { category, description, urgency,contact})
    .then(result=>{console.log(result)
      
    })
    .catch(err=>console.log(err))
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col xs={12} md={8} lg={6}>
          <h3 className="text-center mb-4">Register a Complaint</h3>
          <Form onSubmit={handleSubmit}>
            {/* Category */}
            <Form.Group controlId="formCategory" className="mb-3">
              <Form.Label>Category</Form.Label>
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
                {/* Add more categories as needed */}
              </Form.Control>
            </Form.Group>

            {/* Description */}
            <Form.Group controlId="formDescription" className="mb-3">
              <Form.Label>Description</Form.Label>
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
              <Form.Label>Urgency Level</Form.Label>
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
              <Form.Label>Upload Photo</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => setPhoto(e.target.files[0])}
                required
              />
            </Form.Group>

            {/* Contact Details */}
            <Form.Group controlId="formContact" className="mb-3">
              <Form.Label>Contact Details</Form.Label>
              <Form.Control
                type="text"
                placeholder="Name"
                onChange={(e) => setContact({ ...contact, name: e.target.value })}
                value={contact.name}
                required
              />
              <Form.Control
                type="email"
                placeholder="Email"
                onChange={(e) => setContact({ ...contact, email: e.target.value })}
                value={contact.email}
                required
              />
              <Form.Control
                type="text"
                placeholder="Phone"
                onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                value={contact.phone}
                required
              />
            </Form.Group>

            {/* Submit Button */}
            <Button variant="primary" type="submit" className="w-100">
              Submit Complaint
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default ComplaintForm;
