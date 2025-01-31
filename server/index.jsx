require('dotenv').config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { auth, SECRET_KEY } = require("./auth.jsx");
const jwt = require("jsonwebtoken");
const UserModel = require("./Models/UserModel");
const AdminModel = require("./Models/AdminModel");
 const WarningModel = require("./Models/WarningModel.js")
const ComplaintModel = require("./Models/ComplaintModel");

// Middleware setup
const app = express();
app.use(express.json());
app.use(cors());


// Routes
//!only for user.
// Registration route with email existence check
app.post("/register", async (req, res) => {
  try {
    // Check if email already exists
    const existingUser = await UserModel.findOne({ email: req.body.email });

    if (existingUser) {
      return res.status(409).json({
        message: "A user with this email address already exists"
      });
    }

    // If email doesn't exist, create the new user
    const user = await UserModel.create(req.body);

    // Return user data without password
    const userResponse = user.toObject();
    delete userResponse.password;

    res.json(userResponse);
  } catch (err) {
    res.status(500).json({
      message: "Error creating user",
      error: err.message
    });
  }
});

// **Login for users**
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });

    if (!user) return res.status(404).json({ message: "No record found" });

    if (user.password !== password) return res.status(401).json({ message: "Incorrect Credentials." });

    //! Passing required fields in token.
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        name: user.name,
        isAdmin: false,
      },
      SECRET_KEY,
      { expiresIn: "1h" }
    );
    res.json({ message: "Success", user, token });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
});

// **Login for admins**
app.post("/adminLogin", async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await AdminModel.findOne({ email });

    if (!admin) return res.status(404).json({ message: "No record found" });

    if (admin.password !== password) return res.status(401).json({ message: "Incorrect password" });

    const token = jwt.sign(
      {
        id: admin._id,
        email: admin.email,
        name: admin.name,
        isAdmin: true,
      },
      SECRET_KEY,
      { expiresIn: "1h" }
    );
    res.json({ message: "Success", token, admin: { name: admin.name, role: "admin" } });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
});

// **Submit a complaint**
app.post("/ComplaintForm", async (req, res) => {
  try {
    const complaint = await ComplaintModel.create(req.body);
    res.json(complaint);
  } catch (err) {
    res.status(500).json({ message: "Failed to submit complaint", error: err });
  }
});

// **Get user data**
app.get("/home", auth, async (req, res) => {
  try {
    const user = req.isAdmin
      ? await AdminModel.findById(req.userId)
      : await UserModel.findById(req.userId);

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ email: user.email, name: user.name, role: req.isAdmin ? "admin" : "user" });
  } catch (err) {
    res.status(500).json({ message: "An error occurred on the server", error: err });
  }
});

// **Fetch complaints**
app.get("/complaints", auth, async (req, res) => {
  try {
    const complaints = req.isAdmin
      ? await ComplaintModel.find() // Admin gets all complaints
      : await ComplaintModel.find({ "contact.email": req.userEmail }); // User gets their own complaints
    res.json(complaints);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch complaints", error: err });
  }
});


// **Update complaint status (Admin only)** and notif
app.put("/complaints/:id", auth, async (req, res) => {
  if (!req.isAdmin) return res.status(403).json({ message: "Only admins can update complaint statuses" });

  try {
    const updatedComplaint = await ComplaintModel.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );

    if (!updatedComplaint) return res.status(404).json({ message: "Complaint not found" });

    // Add notification to the user
    const user = await UserModel.findOne({ email: updatedComplaint.contact.email });

    if (user) {
      user.notifications.push({
        message: `Your complaint status has been updated to "${req.body.status}". Feedback: ${req.body.response || "No feedback provided."}`
      });
      await user.save();
    }

    res.json({ message: "Status updated successfully", updatedComplaint });
  } catch (err) {
    res.status(500).json({ message: "Failed to update status", error: err });
  }
});
//to get notif
app.get("/notifications", auth, async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId);

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user.notifications);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch notifications", error: err });
  }
});
//notif for each user
app.put("/notifications/:id/read", auth, async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId);

    if (!user) return res.status(404).json({ message: "User not found" });

    const notification = user.notifications.id(req.params.id);

    if (!notification) return res.status(404).json({ message: "Notification not found" });

    notification.read = true;
    await user.save();

    res.json({ message: "Notification marked as read", notification });
  } catch (err) {
    res.status(500).json({ message: "Failed to update notification", error: err });
  }
});

//notif alert
app.get("/notifications/unread-count", auth, async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId);

    if (!user) return res.status(404).json({ message: "User not found" });

    const unreadCount = user.notifications.filter((notification) => !notification.read).length;

    res.json({ unreadCount });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch unread notifications count", error: err });
  }
});




// **Delete a complaint (User only)**
app.delete("/complaints/:id", auth, async (req, res) => {
  try {
    const complaint = await ComplaintModel.findById(req.params.id);
    if (!complaint) return res.status(404).json({ message: "Complaint not found" });

    if (complaint.contact.email !== req.userEmail)
      return res.status(403).json({ message: "You do not have permission to delete this complaint" });

    await ComplaintModel.deleteOne({ _id: req.params.id });
    res.json({ message: "Complaint deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete complaint", error: err });
  }
});

// Get all users (Admin only)
app.get("/admin/users", auth, async (req, res) => {
  if (!req.isAdmin) {
    return res.status(403).json({ message: "Admin access required" });
  }

  try {
    // Use your existing UserModel
    const users = await UserModel.find({}, '-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Error fetching users", error: err.message });
  }
});


// Create new user (Admin only)
app.post("/admin/users", auth, async (req, res) => {
  if (!req.isAdmin) return res.status(403).json({ message: "Admin access required" });

  try {
    const { name, email, role, password = "defaultPassword123" } = req.body;
    const newUser = await UserModel.create({
      name,
      email,
      role,
      password
    });

    const userWithoutPassword = { ...newUser.toObject(), password: undefined };
    res.json(userWithoutPassword);
  } catch (err) {
    res.status(500).json({ message: "Error creating user", error: err });
  }
});


// Update user (Admin only)
app.put("/admin/users/:id", auth, async (req, res) => {
  if (!req.isAdmin) return res.status(403).json({ message: "Admin access required" });

  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, select: '-password' }
    );

    if (!updatedUser) return res.status(404).json({ message: "User not found" });
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: "Error updating user", error: err });
  }
});

app.delete("/admin/users/:id", auth, async (req, res) => {
  if (!req.isAdmin) return res.status(403).json({ message: "Admin access required" });

  try {
    const deletedUser = await UserModel.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting user", error: err });
  }
});



// **Send emergency message (Admin only)**

app.post("/emergency", auth, async (req, res) => {
  if (!req.isAdmin) {
    return res.status(403).json({ message: "Only admins can send emergency messages" });
  }

  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ message: "Message is required" });
    }

    const newWarning = new WarningModel({ warning: message });
    await newWarning.save();

    res.json({ message: "Emergency message sent and stored successfully", data: newWarning });
  } catch (err) {
    res.status(500).json({ message: "Failed to send emergency message", error: err.message });
  }
});

//warning alert for users
app.get("/warnings", auth, async (req, res) => {
  try {
    const warnings = await WarningModel.find().sort({ createdAt: -1 }).limit(1); 
    res.json(warnings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching warnings", error: error.message });
  }
});


//!MAIN FUNCTION TO START THE SERVER
async function main() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB successfully!");

    // Start the server
    const PORT = 3001;
    app.listen(PORT, () => {
      console.log(`Server is running on port : ${PORT}`);
    });

  } catch (e) {
    console.error("Failed to start the server:", e.message);
    process.exit(1);
  }
}
main();



