import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { Alert, Container, Table } from "react-bootstrap";

const MyComplaints = () => {
   const [complaints, setComplaints] = useState([]);

   useEffect(() => {
      // Replace with your backend API endpoint to fetch complaints
      axios
         .get("http://localhost:3001/complaints")
         .then((response) => {
            setComplaints(response.data);
         })
         .catch((error) => {
            console.error("Error fetching complaints:", error);
         });
   }, []);

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