import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import { Alert, Button, Container, Form } from "react-bootstrap";

const Contact = () => {
   const [formData, setFormData] = useState({
      name: "",
      email: "",
      phone: "",
      message: "",
   });

   const [submitted, setSubmitted] = useState(false);

   const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
         ...prevData,
         [name]: value,
      }));
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      console.log("Submitted data:", formData);
      setSubmitted(true);
   };

   return (
      <Container className="py-5">
         <h1 className="text-center mb-4">Contact Us</h1>
         <p className="text-center mb-4">
            Feel free to reach out with your queries or concerns. We are here to help!
         </p>
         {submitted ? (
            <Alert variant="success" className="text-center">
               <h4>Thank you for contacting us!</h4>
               <p>We have received your message and will get back to you shortly.</p>
            </Alert>
         ) : (
            <Form onSubmit={handleSubmit} className="mx-auto" style={{ maxWidth: "600px" }}>
               <Form.Group controlId="formName" className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                     type="text"
                     name="name"
                     placeholder="Enter your name"
                     value={formData.name}
                     onChange={handleChange}
                     required
                  />
               </Form.Group>

               <Form.Group controlId="formEmail" className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                     type="email"
                     name="email"
                     placeholder="Enter your email"
                     value={formData.email}
                     onChange={handleChange}
                     required
                  />
               </Form.Group>

               <Form.Group controlId="formPhone" className="mb-3">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                     type="tel"
                     name="phone"
                     placeholder="Enter your phone number"
                     value={formData.phone}
                     onChange={handleChange}
                     required
                  />
               </Form.Group>

               <Form.Group controlId="formMessage" className="mb-3">
                  <Form.Label>Message</Form.Label>
                  <Form.Control
                     as="textarea"
                     name="message"
                     placeholder="Enter your message"
                     rows={4}
                     value={formData.message}
                     onChange={handleChange}
                     required
                  />
               </Form.Group>

               <div className="text-center">
                  <Button variant="primary" type="submit">
                     Submit
                  </Button>
               </div>
            </Form>
         )}
      </Container>
   );
};

export default Contact;
