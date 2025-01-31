
const mongoose = require("mongoose")

const WarningSchema = new mongoose.Schema({
    warning: String,
    createdAt:{
        type: Date,
        default: Date.now,
    }
})

const WarningModel = mongoose.model("warnings", WarningSchema)
module.exports = WarningModel
