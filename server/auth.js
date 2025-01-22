const jwt = require("jsonwebtoken");

const SECRET_KEY = "your_secret_key";

// Middleware to verify token
const auth = (req, res, next) => {
   const token = req.headers["token"];

   if (!token) {
      return res.status(403).json({ message: "Access denied" });
   }

   jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (err) {
         return res.status(401).json({ message: "Invalid token" });
      }
      req.userId = decoded.id;
      next();
   });
};

module.exports = {
   auth,
   SECRET_KEY
}