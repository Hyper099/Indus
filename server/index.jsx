const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { auth, SECRET_KEY } = require("./auth.jsx");
const jwt = require("jsonwebtoken");
const UserModel = require("./Models/Users");
const AdminModel = require("./Models/AdminModel");
const ComplaintModel = require("./Models/Complaints");

// Middleware setup
const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect("mongodb+srv://MananDataB:manan2005@cluster0.a3rww.mongodb.net/Users?retryWrites=true&w=majority&appName=Cluster0",
  { useNewUrlParser: true, useUnifiedTopology: true }
).then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

// Create a new user
app.post('/register', async (req, res) => {
  try {
    const user = await UserModel.create(req.body);
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Error creating user", error: err });
  }
});

// Login for users
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "No record found" });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    const token = jwt.sign({
      id: user._id,
      email: user.email,
      name: user.name
    }, SECRET_KEY, { expiresIn: "1h" }
    );
    res.json({ message: "Success", user, token });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
});

app.post('/adminLogin', async (req, res) => {
  const { email, password } = req.body;
  console.log("hi");
  try {
    const admin = await AdminModel.findOne({ email });

    if (!admin) {
      return res.status(404).json({ message: "No record found" });
    }

    if (admin.password !== password) {
      return res.status(401).json({ message: "Incorrect password" });
    }
    console.log("hi4");
    const token = jwt.sign({
      id: admin._id,
      role: "admin"
    }, SECRET_KEY, { expiresIn: "1h" });
    console.log("hi2");
    res.json({ message: "Success", token, admin: { name: admin.name, role: "admin" } });
    console.log(token);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
});



// Submit a complaint form
app.post('/ComplaintForm', async (req, res) => {
  console.log("Received Data:", req.body);
  try {
    const complaint = await ComplaintModel.create(req.body);
    res.json(complaint);
  } catch (err) {
    res.status(500).json({ message: "Failed to submit complaint", error: err });
  }
});

// Protected route: Get user data
app.get('/home', auth, async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ email: user.email, name: user.name, role: user.role });
  } catch (err) {
    res.status(500).json({ message: "An error occurred on the server", error: err });
  }
});

// Fetch all complaints for Admin or user-specific complaints for users
app.get('/complaints', auth, async (req, res) => {
  try {
    // Check if the user is an admin
    if (req.isAdmin) {
      const complaints = await ComplaintModel.find(); // Admin gets all complaints
      res.json(complaints);
    }
    else {
      // Regular users get only their own complaints
      const complaints = await ComplaintModel.find({
        "contact.email": req.userEmail,
      });
      res.json(complaints);
    }

  } catch (err) {
    res.status(500).json({ message: "Failed to fetch complaints", error: err });
  }
});

app.put('/complaints/:id', auth, async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!req.isAdmin) {
    return res.status(403).json({ message: "Only admins can update complaint statuses" });
  }

  try {
    const updatedComplaint = await ComplaintModel.findByIdAndUpdate(
      id,
      { status },
      { new: true } // Return the updated document
    );

    if (!updatedComplaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    res.json({ message: "Status updated successfully", updatedComplaint });
  } catch (err) {
    res.status(500).json({ message: "Failed to update status", error: err });
  }
});


app.post('/emergency', auth, async (req, res) => {
  const { message } = req.body;

  if (!req.isAdmin) {
    return res.status(403).json({ message: "Only admins can send emergency messages" });
  }

  try {
    // For demonstration, we're just logging the message
    console.log("Emergency message:", message);
    // In a real app, you might send emails, SMS, or push notifications here
    res.json({ message: "Emergency message sent successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to send emergency message", error: err });
  }
});



//deleting a complaint from user side
app.delete('/complaints/:id', auth, async (req, res) => {
  const { id } = req.params;
  const userEmail = req.userEmail;

  try {
    // Find the complaint
    const complaint = await ComplaintModel.findOne({ _id: id });

    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    // Ensure the user has permission to delete the complaint
    if (complaint.contact.email !== userEmail) {
      return res.status(403).json({ message: "You do not have permission to delete this complaint" });
    }

    // Delete the complaint
    await ComplaintModel.deleteOne({ _id: id });
    res.json({ message: "Complaint deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete complaint", error: err });
  }
});


// Start the server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port : ${PORT}`);
}); 
