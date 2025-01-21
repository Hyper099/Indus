const mongoose = require("mongoose")
//making a schema
const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
})

const UserModel = mongoose.model("users", UserSchema)   //this will create a collection called users in mongodb with the provided schema
module.exports = UserModel