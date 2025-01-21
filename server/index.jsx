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

    const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: "1h" });
    res.json({ message: "Success", token, user });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
});

// Login for admins
app.post('/adminlogin', async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await AdminModel.findOne({ email });

    if (!admin) {
      return res.status(404).json({ message: "No record found" });
    }

    if (admin.password !== password) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    const token = jwt.sign({ id: admin._id }, SECRET_KEY, { expiresIn: "1h" });
    res.json({ message: "Success", token, admin });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
});

// Submit a complaint form
app.post('/ComplaintForm', async (req, res) => {
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

    res.json({ email: user.email, name: user.name });
  } catch (err) {
    res.status(500).json({ message: "An error occurred on the server", error: err });
  }
});

// Start the server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
