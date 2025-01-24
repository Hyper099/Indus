import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { Alert, Container, Table } from "react-bootstrap";
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

   return (
      <Container className="py-5">
         <h1 className="text-center mb-4">My Complaints</h1>
         {complaints.length === 0 ? (
            <Alert variant="info" className="text-center">
               No complaints found.
            </Alert>
         ) : (
            <Table striped bordered hover responsive>
               <thead>
                  <tr>
                     <th>#</th>
                     <th>Name</th>
                     <th>Email</th>
                     <th>Phone</th>
                     <th>Message</th>
                     <th>Urgency</th>
                     <th>Status</th>
                     <th>Date</th>
                  </tr>
               </thead>
               <tbody>
                  {complaints.map((complaint, index) => (
                     <tr key={complaint._id}>
                        <td>{index + 1}</td>
                        <td>{complaint.contact.name}</td>
                        <td>{complaint.contact.email}</td>
                        <td>{complaint.contact.phone}</td>
                        <td>{complaint.description}</td>
                        <td>{complaint.urgency}</td>
                        <td>{complaint.status}</td>
                        <td>{complaint.createdAt}</td>
                     </tr>
                  ))}
               </tbody>
            </Table>
         )}
      </Container>
   );
};

export default MyComplaints;
