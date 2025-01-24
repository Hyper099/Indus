import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { Accordion, Alert, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const MyComplaints = () => {
   const [complaints, setComplaints] = useState([]);
   const navigate = useNavigate();

   useEffect(() => {
      const fetchComplaints = async () => {
         const token = localStorage.getItem("token");

         // Check if token exists
         if (!token) {
            alert("Please log in to view your complaints.");
            navigate("/login"); // Redirect to login page
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

   // Function to get accordion header color based on urgency
   const getHeaderStyle = (urgency) => {
      switch (urgency.toLowerCase()) {
         case "high":
            return { backgroundColor: "#f8d7da", color: "#721c24" }; // Red for high urgency
         case "medium":
            return { backgroundColor: "#fff3cd", color: "#856404" }; // Yellow for medium urgency
         case "low":
            return { backgroundColor: "#d4edda", color: "#155724" }; // Green for low urgency
         default:
            return { backgroundColor: "#f1f1f1", color: "#333" }; // Default gray
      }
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
                  marginBottom: "10px", // Space between the accordion items
                  border: "1px solid", 
                  borderColor: getHeaderStyle(complaint.urgency).borderColor || "#ccc", // Border color matching urgency
                  borderRadius: "5px"
                }}
              >
                {/* Accordion Header */}
                <Accordion.Header style={{
                  backgroundColor: getHeaderStyle(complaint.urgency).backgroundColor,
                  color: getHeaderStyle(complaint.urgency).color,
                  padding: "10px 15px", // Padding inside the header
                  fontWeight: "bold",
                  borderTopLeftRadius: "5px",
                  borderTopRightRadius: "5px"
                }}>
                  <div style={{ width: "100%" }}>
                    <span>{complaint.description}</span> - {complaint.contact.email}
                  </div>
                </Accordion.Header>
                
                {/* Accordion Body */}
                <Accordion.Body style={{
                  backgroundColor: getHeaderStyle(complaint.urgency).backgroundColor,
                  padding: "15px", // Padding inside the body
                  borderBottomLeftRadius: "5px",
                  borderBottomRightRadius: "5px"
                }}>
                  <p><strong>Name:</strong> {complaint.contact.name}</p>
                  <p><strong>Phone:</strong> {complaint.contact.phone}</p>
                  <p><strong>Status:</strong> {complaint.status}</p>
                  <p><strong>Date Submitted:</strong> {new Date(complaint.createdAt).toLocaleString()}</p>
                  <p><strong>Urgency:</strong> {complaint.urgency}</p>
                </Accordion.Body>
              </Accordion.Item>
              
               ))}
            </Accordion>
         )}
      </Container>
   );
};

export default MyComplaints;
