const mongoose = require("mongoose");
const cartSchema = mongoose.Schema({
  userId:'string',
  //productId: "string",
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product' // Reference to the products collection
  },
  Qty: "number",
});
module.exports = mongoose.model("carts", cartSchema);

