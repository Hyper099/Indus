import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { Accordion, Alert, Container, Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const MyComplaints = () => {
   const [complaints, setComplaints] = useState([]);
   const [showModal, setShowModal] = useState(false);
   const [selectedComplaint, setSelectedComplaint] = useState(null);
   const navigate = useNavigate();

   useEffect(() => {
      const fetchComplaints = async () => {
         const token = localStorage.getItem("token");

         if (!token) {
            alert("Please log in to view your complaints.");
            navigate("/login");
            return;
         }

         try {
            const response = await axios.get("http://localhost:3001/complaints", {
               headers: {
                  token: `${token}`,
               },
            });
            setComplaints(response.data);
         } catch (error) {
            console.error("Error fetching complaints:", error);
         }
      };

      fetchComplaints();
   }, [navigate]);

   // Function to delete a complaint
   const deleteComplaint = async (id) => {
      const token = localStorage.getItem("token");
      try {
         await axios.delete(`http://localhost:3001/complaints/${id}`, {
            headers: {
               token: `${token}`,
            },
         });
         setComplaints((prevComplaints) =>
            prevComplaints.filter((complaint) => complaint._id !== id)
         );
         setShowModal(false);
         alert("Complaint deleted successfully!");
      } catch (error) {
         console.error("Error deleting complaint:", error);
         alert("Failed to delete the complaint. Please try again.");
      }
   };

   const getHeaderStyle = (urgency) => {
      switch (urgency.toLowerCase()) {
         case "high":
            return { backgroundColor: "#f8d7da", color: "#721c24" };
         case "medium":
            return { backgroundColor: "#fff3cd", color: "#856404" };
         case "low":
            return { backgroundColor: "#d4edda", color: "#155724" };
         default:
            return { backgroundColor: "#f1f1f1", color: "#333" };
      }
   };

   const handleDeleteClick = (complaint) => {
      setSelectedComplaint(complaint);
      setShowModal(true);
   };

   return (
      <Container className="py-5">
         <h1 className="text-center mb-4">My Complaints</h1>
         {complaints.length === 0 ? (
            <Alert variant="info" className="text-center">
               No complaints found.
            </Alert>
         ) : (
            <Accordion defaultActiveKey={null}>
               {complaints.map((complaint, index) => (
                  <Accordion.Item
                     key={complaint._id}
                     eventKey={index}
                     style={{
                        marginBottom: "10px",
                        border: "1px solid",
                        borderColor: getHeaderStyle(complaint.urgency).borderColor || "#ccc",
                        borderRadius: "5px",
                     }}
                  >
                     {/* Accordion Header */}
                     <Accordion.Header
                        style={{
                           backgroundColor: getHeaderStyle(complaint.urgency).backgroundColor,
                           color: getHeaderStyle(complaint.urgency).color,
                           padding: "10px 15px",
                           fontWeight: "bold",
                           borderTopLeftRadius: "5px",
                           borderTopRightRadius: "5px",
                        }}
                     >
                       <div style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
   <span>
      {complaint.category} - {complaint.contact.email}
   </span>
   <div style={{ display: "flex", gap: "10px" }}>
      {/* <Button
         variant="primary"
         size="sm"
      >
         Edit
      </Button> */}
      <Button
         variant="danger"
         size="sm"
         onClick={(e) => {
            e.stopPropagation(); // Prevent Accordion toggle
            handleDeleteClick(complaint);
         }}
      >
         Delete
      </Button>
   </div>
</div>

                     </Accordion.Header>

                     {/* Accordion Body */}
                     <Accordion.Body
                        style={{
                           backgroundColor: getHeaderStyle(complaint.urgency).backgroundColor,
                           padding: "15px",
                           borderBottomLeftRadius: "5px",
                           borderBottomRightRadius: "5px",
                        }}
                     >
                        <p>
                           <strong>ID:</strong> {complaint._id}
                        </p>
                        <p>
                           <strong>Name:</strong> {complaint.contact.name}
                        </p>
                        <p>
                           <strong>Phone:</strong> {complaint.contact.phone}
                        </p>
                        <p>
                           <strong>Description:</strong> {complaint.description}
                        </p>
                        <p>
                           <strong>Address:</strong> {complaint.address}
                        </p>
                        <p>
                           <strong>Area:</strong> {complaint.area}
                        </p>
                        <p>
                           <strong>Status:</strong> {complaint.status}
                        </p>
                        <p>
                           <strong>Date Submitted:</strong> {new Date(complaint.createdAt).toLocaleString()}
                        </p>
                        <p>
                           <strong>Urgency:</strong> {complaint.urgency}
                        </p>
                     </Accordion.Body>
                  </Accordion.Item>
               ))}
            </Accordion>
         )}

         {/* Confirmation Modal */}
         <Modal show={showModal} onHide={() => setShowModal(false)} centered>
            <Modal.Header closeButton>
               <Modal.Title>Confirm Deletion</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               Are you sure you want to delete this complaint?
               <p><strong>ID:</strong> {selectedComplaint?._id}</p>
            </Modal.Body>
            <Modal.Footer>
               <Button variant="secondary" onClick={() => setShowModal(false)}>
                  Cancel
               </Button>
               <Button variant="danger" onClick={() => deleteComplaint(selectedComplaint._id)}>
                  Delete
               </Button>
            </Modal.Footer>
         </Modal>
      </Container>
   );
};

export default MyComplaints;
