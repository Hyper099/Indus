const monogoose = require("mongoose")

//admin schema

const AdminSchema = new monogoose.Schema(
    {
        name: String,
        password: String,
        email: String,
    }
)
const AdminModel = monogoose.model("admins", AdminSchema)
module.exports = AdminModel