const mongoose = require("mongoose");
const loginSchema = mongoose.Schema({
    username:"string",
    password:"number",
});
module.exports = mongoose.model("users", loginSchema);