const mongoose = require("mongoose")

const ComplaintSchema = new mongoose.Schema({
    category: String,
    description: String,
    urgency: String,
    contact: {
        name: String,
        email: String,
        phone: String,
      },

})
const ComplaintModel = mongoose.model("complaints", ComplaintSchema)
module.exports = ComplaintModel