const mongoose = require("mongoose")
const {Schema} = mongoose

const adminSchema = new Schema({
    name: {type: String},
    email: {type:String},
    password: {type:String}
})
    
const Admin = mongoose.model("Admin", adminSchema)

module.exports = Admin