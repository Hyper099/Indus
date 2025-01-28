const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema({
    message: { type: String, required: true }, // The content of the notification
    timestamp: { type: Date, default: Date.now }, // When the notification was created
    read: { type: Boolean, default: false } // Whether the notification has been read
});

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    notifications: [NotificationSchema] // Embedded notifications array
});

const UserModel = mongoose.model("User", UserSchema);
module.exports = UserModel;
