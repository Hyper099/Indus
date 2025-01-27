import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Alert, Badge, Button, Card, Container, Form, Modal, Table } from 'react-bootstrap';

const ManageComplaints = () => {
   const [complaints, setComplaints] = useState([]);
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
         const response = await axios.get('http://localhost:3001/admin/complaints', {
            headers: { token }
         });
         setComplaints(response.data);
      } catch (error) {
         showAlert('Error fetching complaints', 'danger');
      }
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
         await axios.put(`http://localhost:3001/admin/complaints/${selectedComplaint._id}`, formData, {
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

               <Table striped bordered hover responsive>
                  <thead>
                     <tr>
                        <th>User</th>
                        <th>Subject</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Date</th>
                        <th>Actions</th>
                     </tr>
                  </thead>
                  <tbody>
                     {complaints.map((complaint) => (
                        <tr key={complaint._id}>
                           <td>{complaint.userId?.name || 'Anonymous'}</td>
                           <td>{complaint.subject}</td>
                           <td>{complaint.description.substring(0, 100)}...</td>
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
                        <p><strong>Subject:</strong> {selectedComplaint.subject}</p>
                        <p><strong>Description:</strong> {selectedComplaint.description}</p>
                        <p><strong>Submitted by:</strong> {selectedComplaint.userId?.name || 'Anonymous'}</p>
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
                              <option value="pending">Pending</option>
                              <option value="in-progress">In Progress</option>
                              <option value="resolved">Resolved</option>
                              <option value="rejected">Rejected</option>
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