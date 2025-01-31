import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Alert, Badge, Button, Card, Container, Form, Modal, Table } from 'react-bootstrap';

const ManageComplaints = () => {
   const [complaints, setComplaints] = useState([]);
   const [groupedComplaints, setGroupedComplaints] = useState({});
   const [showModal, setShowModal] = useState(false);
   const [selectedComplaint, setSelectedComplaint] = useState(null);
   const [alert, setAlert] = useState(null);
   const [formData, setFormData] = useState({
      status: '',
      response: ''
   });

   useEffect(() => {
      fetchComplaints();
   }, []);

   const fetchComplaints = async () => {
      try {
         const token = localStorage.getItem('token');
         const response = await axios.get('http://localhost:3001/complaints', {
            headers: { token }
         });
         setComplaints(response.data);
         groupComplaintsByCategory(response.data);
      } catch (error) {
         showAlert('Error fetching complaints', 'danger');
      }
   };

   const groupComplaintsByCategory = (complaints) => {
      const grouped = complaints.reduce((acc, complaint) => {
         const category = complaint.category || 'Uncategorized';
         if (!acc[category]) acc[category] = [];
         acc[category].push(complaint);
         return acc;
      }, {});
      setGroupedComplaints(grouped);
   };

   const handleInputChange = (e) => {
      setFormData({
         ...formData,
         [e.target.name]: e.target.value
      });
   };

   const showAlert = (message, type) => {
      setAlert({ message, type });
      setTimeout(() => setAlert(null), 3000);
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      try {
         const token = localStorage.getItem('token');
         console.log(selectedComplaint._id)
         await axios.put(`http://localhost:3001/complaints/${selectedComplaint._id}`, formData, {
            headers: { token }
         });
         showAlert('Complaint updated successfully', 'success');
         setShowModal(false);
         fetchComplaints();
         resetForm();
      } catch (error) {
         showAlert('Error updating complaint', 'danger');
      }
   };

   const handleView = (complaint) => {
      setSelectedComplaint(complaint);
      setFormData({
         status: complaint.status,
         response: complaint.response || ''
      });
      setShowModal(true);
   };

   const getStatusBadge = (status) => {
      const variants = {
         pending: 'warning',
         'in-progress': 'info',
         resolved: 'success',
         rejected: 'danger'
      };
      return <Badge bg={variants[status] || 'secondary'}>{status}</Badge>;
   };

   const resetForm = () => {
      setFormData({
         status: '',
         response: ''
      });
      setSelectedComplaint(null);
   };

   return (
      <Container className="py-4">
         <Card className="shadow-sm">
            <Card.Header className="bg-white">
               <h2 className="mb-0">Manage Complaints</h2>
            </Card.Header>
            <Card.Body>
               {alert && (
                  <Alert variant={alert.type} className="mb-3">
                     {alert.message}
                  </Alert>
               )}

               {Object.keys(groupedComplaints).map((category) => (
                  <div key={category} className="mb-4">
                     <h4 className="text-primary mb-3">{category}</h4>
                     <Table striped bordered hover responsive>
                        <thead>
                           <tr>
                              <th>User</th>
                              <th>Phone No</th>
                              <th>Area</th>
                              <th>Description</th>
                              <th>Status</th>
                              <th>Date</th>
                              <th>Actions</th>
                           </tr>
                        </thead>
                        <tbody>
                           {groupedComplaints[category].map((complaint) => (
                              <tr key={complaint._id}>
                                 <td>{complaint.contact.name}</td>
                                 <td>{complaint.contact.phone}</td>
                                 <td>{complaint.area}</td>
                                 <td>{complaint.description}</td>
                                 <td>{getStatusBadge(complaint.status)}</td>
                                 <td>{new Date(complaint.createdAt).toLocaleDateString()}</td>
                                 <td>
                                    <Button variant="primary" size="sm" onClick={() => handleView(complaint)}>
                                       View & Update
                                    </Button>
                                 </td>
                              </tr>
                           ))}
                        </tbody>
                     </Table>
                  </div>
               ))}
            </Card.Body>
         </Card>

         <Modal show={showModal} onHide={() => {
            setShowModal(false);
            resetForm();
         }} size="lg">
            <Modal.Header closeButton>
               <Modal.Title>View Complaint</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               {selectedComplaint && (
                  <>
                     <div className="mb-4">
                        <h5>Complaint Details</h5>
                        <p><strong>Category:</strong> {selectedComplaint.category}</p>
                        <p><strong>Description:</strong> {selectedComplaint.description}</p>
                        <p><strong>Submitted by:</strong> {selectedComplaint.contact.name}</p>
                        <p><strong>Date:</strong> {new Date(selectedComplaint.createdAt).toLocaleString()}</p>
                     </div>

                     <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                           <Form.Label>Status</Form.Label>
                           <Form.Select
                              name="status"
                              value={formData.status}
                              onChange={handleInputChange}
                              required
                           >
                              <option value="">Select Status</option>
                              <option value="pending">pending</option>
                              <option value="in-progress">in-progress</option>
                              <option value="resolved">resolved</option>
                              <option value="rejected">rejected</option>
                           </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3">
                           <Form.Label>Response</Form.Label>
                           <Form.Control
                              as="textarea"
                              rows={4}
                              name="response"
                              value={formData.response}
                              onChange={handleInputChange}
                              placeholder="Enter your response to the complaint..."
                              required
                           />
                        </Form.Group>

                        <div className="text-end">
                           <Button variant="secondary" className="me-2" onClick={() => {
                              setShowModal(false);
                              resetForm();
                           }}>
                              Close
                           </Button>
                           <Button variant="primary" type="submit">
                              Update Complaint
                           </Button>
                        </div>
                     </Form>
                  </>
               )}
            </Modal.Body>
         </Modal>
      </Container>
   );
};

export default ManageComplaints;
