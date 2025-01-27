const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: String, default: "admin" }, // Role field for future extensibility
});

const AdminModel = mongoose.model("Admin", AdminSchema);
module.exports = AdminModel;
