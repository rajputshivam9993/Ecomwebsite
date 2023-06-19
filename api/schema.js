const mongoose = require("mongoose");
const thingschema = mongoose.Schema({
ProducttName:"string",
Qty:"number",
Price:"string",
image:"string",
Details:"string",
});
module.exports = mongoose.model("products", thingschema);
