//!ROuter for better Routing
const { Router } = require("express");
const { UserModel } = require("../Models/UserModel");

const userRouter = Router();

userRouter.post("/register", async (req, res) => {
   try {
      // Check if email already exists
      const existingUser = await UserModel.findOne({ email: req.body.email });
      console.log(existingUser);
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
})

userRouter.post("/login", async (req, res) => {
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
})


module.exports = {
   userRouter: userRouter
};

