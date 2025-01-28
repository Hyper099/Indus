import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Alert, Button, Card, Container, Form, Modal, Table } from 'react-bootstrap';

const ManageUsers = () => {
   const [users, setUsers] = useState([]);
   const [showModal, setShowModal] = useState(false);
   const [selectedUser, setSelectedUser] = useState(null);
   const [alert, setAlert] = useState(null);
   const [loading, setLoading] = useState(true);
   const [formData, setFormData] = useState({
      name: '',
      email: '',
      role: 'user'
   });

   useEffect(() => {
      fetchUsers();
   }, []);

   const fetchUsers = async () => {
      try {
         setLoading(true);
         const token = localStorage.getItem('token');

         // Debug logging
         console.log("Token:", token);

         // First, test if the API is reachable
         //const testResponse = await axios.get('http://localhost:3001/api/test');
         //console.log("API Test Response:", testResponse.data);

         // Then try the users endpoint
         const response = await axios.get('http://localhost:3001/admin/users', {
            headers: { token }
         });
         console.log("Users Response:", response.data);
         setUsers(response.data);
      } catch (error) {
         console.error("Full error:", error);
         showAlert(error.response?.data?.message || 'Error fetching users', 'danger');
      } finally {
         setLoading(false);
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
         if (selectedUser) {
            await axios.put(`http://localhost:3001/admin/users/${selectedUser._id}`, formData, {
               headers: { token }
            });
            showAlert('User updated successfully', 'success');
         } else {
            await axios.post('http://localhost:3001/admin/users', formData, {
               headers: { token }
            });
            showAlert('User created successfully', 'success');
         }
         setShowModal(false);
         fetchUsers();
         resetForm();
      } catch (error) {
         showAlert(error.response?.data?.message || 'Error saving user', 'danger');
      }
   };

   const handleEdit = (user) => {
      setSelectedUser(user);
      setFormData({
         name: user.name,
         email: user.email,
         role: user.role || 'user'
      });
      setShowModal(true);
   };

   const handleDelete = async (userId) => {
      if (window.confirm('Are you sure you want to delete this user?')) {
         try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:3001/admin/users/${userId}`, {
               headers: { token }
            });
            showAlert('User deleted successfully', 'success');
            fetchUsers();
         } catch (error) {
            showAlert(error.response?.data?.message || 'Error deleting user', 'danger');
         }
      }
   };

   const resetForm = () => {
      setFormData({
         name: '',
         email: '',
         role: 'user'
      });
      setSelectedUser(null);
   };

   return (
      <Container className="py-4">
         <Card className="shadow-sm">
            <Card.Header className="bg-white">
               <div className="d-flex justify-content-between align-items-center">
                  <h2 className="mb-0">Manage Users</h2>
                  <Button variant="primary" onClick={() => setShowModal(true)}>
                     Add New User
                  </Button>
               </div>
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
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Actions</th>
                     </tr>
                  </thead>
                  <tbody>
                     {loading ? (
                        <tr>
                           <td colSpan="4" className="text-center">Loading users...</td>
                        </tr>
                     ) : users.length === 0 ? (
                        <tr>
                           <td colSpan="4" className="text-center">No users found</td>
                        </tr>
                     ) : (
                        users.map((user) => (
                           <tr key={user._id}>
                              <td>{user.name}</td>
                              <td>{user.email}</td>
                              <td>{user.role || 'user'}</td>
                              <td>
                                 <Button
                                    variant="info"
                                    size="sm"
                                    className="me-2"
                                    onClick={() => handleEdit(user)}
                                 >
                                    Edit
                                 </Button>
                                 <Button
                                    variant="danger"
                                    size="sm"
                                    onClick={() => handleDelete(user._id)}
                                 >
                                    Delete
                                 </Button>
                              </td>
                           </tr>
                        ))
                     )}
                  </tbody>
               </Table>
            </Card.Body>
         </Card>

         <Modal show={showModal} onHide={() => {
            setShowModal(false);
            resetForm();
         }}>
            <Modal.Header closeButton>
               <Modal.Title>{selectedUser ? 'Edit User' : 'Add New User'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                     <Form.Label>Name</Form.Label>
                     <Form.Control
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                     />
                  </Form.Group>
                  <Form.Group className="mb-3">
                     <Form.Label>Email</Form.Label>
                     <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                     />
                  </Form.Group>
                  <Form.Group className="mb-3">
                     <Form.Label>Role</Form.Label>
                     <Form.Select
                        name="role"
                        value={formData.role}
                        onChange={handleInputChange}
                     >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                     </Form.Select>
                  </Form.Group>
                  <div className="text-end">
                     <Button
                        variant="secondary"
                        className="me-2"
                        onClick={() => {
                           setShowModal(false);
                           resetForm();
                        }}
                     >
                        Cancel
                     </Button>
                     <Button variant="primary" type="submit">
                        {selectedUser ? 'Update' : 'Create'}
                     </Button>
                  </div>
               </Form>
            </Modal.Body>
         </Modal>
      </Container>
   );
};

export default ManageUsers;