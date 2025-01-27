import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Modal, Row, Table } from "react-bootstrap";

function AdminDashboard() {
    const [complaints, setComplaints] = useState([]);
    const [selectedComplaint, setSelectedComplaint] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [statusUpdate, setStatusUpdate] = useState("");
    const [emergencyMessage, setEmergencyMessage] = useState("");
    const [showEmergencyModal, setShowEmergencyModal] = useState(false);

    // Fetch complaints data
    useEffect(() => {
        axios
            .get("http://localhost:3001/complaints")
            .then((response) => setComplaints(response.data))
            .catch((error) => console.error("Error fetching complaints:", error));
    }, []);

    // Open complaint modal
    const handleViewComplaint = (complaint) => {
        setSelectedComplaint(complaint);
        setShowModal(true);
    };

    // Update complaint status
    const handleUpdateStatus = () => {
        if (selectedComplaint) {
            axios
                .put(`http://localhost:3001/complaints/${selectedComplaint.id}`, { status: statusUpdate })
                .then(() => {
                    alert("Status updated successfully!");
                    setShowModal(false);
                    setComplaints((prev) =>
                        prev.map((comp) =>
                            comp.id === selectedComplaint.id ? { ...comp, status: statusUpdate } : comp
                        )
                    );
                })
                .catch((error) => console.error("Error updating status:", error));
        }
    };

    // Send emergency message
    const handleSendEmergencyMessage = () => {
        axios
            .post("http://localhost:3001/emergency", { message: emergencyMessage })
            .then(() => {
                alert("Emergency message sent!");
                setShowEmergencyModal(false);
                setEmergencyMessage("");
            })
            .catch((error) => console.error("Error sending emergency message:", error));
    };

    return (
        <Container className="mt-5">
            <Row className="mb-3">
                <Col>
                    <h2>Admin Dashboard</h2>
                    <Button variant="danger" onClick={() => setShowEmergencyModal(true)}>
                        Issue Emergency Warning
                    </Button>
                </Col>
            </Row>

            <Row>
                <Col>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Category</th>
                                <th>Description</th>
                                <th>Urgency</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {complaints.map((complaint) => (
                                <tr key={complaint.id}>
                                    <td>{complaint.id}</td>
                                    <td>{complaint.category}</td>
                                    <td>{complaint.description}</td>
                                    <td>{complaint.urgency}</td>
                                    <td>{complaint.status}</td>
                                    <td>
                                        <Button
                                            variant="primary"
                                            size="sm"
                                            onClick={() => handleViewComplaint(complaint)}
                                        >
                                            View / Update
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>

            {/* Complaint Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Complaint Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedComplaint && (
                        <>
                            <p><strong>ID:</strong> {selectedComplaint.id}</p>
                            <p><strong>Category:</strong> {selectedComplaint.category}</p>
                            <p><strong>Description:</strong> {selectedComplaint.description}</p>
                            <p><strong>Urgency:</strong> {selectedComplaint.urgency}</p>
                            <p><strong>Status:</strong> {selectedComplaint.status}</p>
                            <Form.Group className="mt-3">
                                <Form.Label>Update Status</Form.Label>
                                <Form.Control
                                    as="select"
                                    value={statusUpdate}
                                    onChange={(e) => setStatusUpdate(e.target.value)}
                                >
                                    <option value="">Select Status</option>
                                    <option value="Pending">Pending</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Resolved">Resolved</option>
                                    <option value="Escalated">Escalated</option>
                                </Form.Control>
                            </Form.Group>
                        </>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleUpdateStatus}>
                        Update Status
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Emergency Modal */}
            <Modal show={showEmergencyModal} onHide={() => setShowEmergencyModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Issue Emergency Warning</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>Emergency Message</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            value={emergencyMessage}
                            onChange={(e) => setEmergencyMessage(e.target.value)}
                            placeholder="Type your emergency message here..."
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowEmergencyModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleSendEmergencyMessage}>
                        Send Message
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}

export default AdminDashboard;
