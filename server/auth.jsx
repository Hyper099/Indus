const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.JWT_SECRET_KEY;

function auth(req, res, next) {
   const token = req.headers.token;
   if (!token) return res.status(401).json({ message: "Unauthorized" });

   try {
      const decoded = jwt.verify(token, SECRET_KEY);
      req.userId = decoded.id;
      req.isAdmin = decoded.isAdmin || false;
      req.userEmail = decoded.email;
      req.userName = decoded.name;
      next();
   } catch (err) {
      res.status(403).json({ message: "Invalid token", error: err });
   }
}

module.exports = {
   auth,
   SECRET_KEY,
};
