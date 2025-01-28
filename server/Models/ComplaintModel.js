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
  address: String,
  landmark: String,
  preferredContact: String,
  area: String,

  status: {
    type: String,
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },

})
const ComplaintModel = mongoose.model("complaints", ComplaintSchema)
module.exports = ComplaintModel