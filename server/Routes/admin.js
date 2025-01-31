//!ROuter for better Routing
const { Router } = require("express");
const { AdminModel } = require("../Models/AdminModel");

const adminRouter = Router();

adminRouter.post("/login", async (req, res) => {
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
})


module.exports = {
   adminRouter: adminRouter
};

