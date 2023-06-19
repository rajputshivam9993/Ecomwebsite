const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
require("./config");
const productsCart = require("./addcartSchema");
const model = require("./schema");
const LoginSchema = require("./LoginSchema");
const app = express();
var corsOptions = {
  origin: "*",
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const secretKey = "Sam@sung7";

//api for add to cart
app.post("/api/addcart", async (req, res) => {
  const data = new productsCart(req.body);
  const result = await data.save();
  res.send({
    success: true,
    message: "Added cart successfully",
    data: result,
  });
});

//api for get products
app.get("/api/products", async (req, res) => {
  const db = await model.find();
  res.send(db);
});

//for show listing which is added in cart join
app.get("/api/getCartList", async (req, res) => {
  const db = await productsCart.aggregate([
    {
      $lookup: {
        from: "products",
        localField: "productId",
        foreignField: "_id",
        as: "productDetails",
      },
    },
  ]);
  res.send(db);
});

//api for add to cart count
app.get("/api/getCartCount", async (req, resp) => {
  let data = await productsCart.find({ userId: req.query.userId }).count();
  console.log(data);
  if (data) {
    resp.send({
      success: true,
      data: data,
    });
  } else {
    resp.send("no record found");
    console.log("no record found");
  }
});

//api for delete cart items
app.delete("/api/deleteCartItem/:id", async (req, resp) => {
  const data = await productsCart.deleteOne({ _id: req.params.id });
  if (data.deletedCount === 1) {
    resp.send({
      success: true,
      message: "Deleted item successfully",
      data: data,
    });
  } else {
    console.log("no item delete");
    resp.send("no record");
  }
});

//api for search product
app.get("/api/search/:key", async (req, resp) => {
  try {
    const data = await model.find({
      $or: [{ ProducttName: { $regex: req.params.key } }],
    });
    resp.send({
      success: true,
      message: "Searched item successfully",
      data: data,
    });
  } catch (error) {
    console.error(error);
    resp.status(500).send("Internal Server Error");
  }
});

//api for increase or decrese cart item quantity
app.put("/api/UpdateCartItem", async (req, resp) => {
  let cr_status = req.query.cr_status;
  let cartId = req.query.cartId;
  if (cr_status === "add") {
    var data = await productsCart.updateOne(
      { _id: cartId },
      { $inc: { Qty: 1 } }
    );
  } else if (cr_status === "remove") {
    var data = await productsCart.updateOne(
      { _id: cartId },
      { $inc: { Qty: -1 } }
    );
  }
  if (data.modifiedCount === 1) {
    resp.send({
      success: true,
      message: "updated item successfully",
      data: data,
    });
  } else {
    resp.send({
      success: false,
      message: "update item failed",
    });
  }
});

//api for get product details
app.get("/api/ItemDetails/:id", async (req, res) => {
  let data = await model.find({ _id: req.params.id });
  res.send({
    success: true,
    message: "Find item details successfully",
    data: data,
  });
});

//api for login
app.post("/api/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await LoginSchema.findOne({ username, password });
    if (user) {
      const token = jwt.sign(
        { username: user.username, id: user._id},
        secretKey,
        { expiresIn: "1h" }
      );
      res.send({
        success: true,
        message: "Login successfully",
        token: token,
      });
    }
  } catch (error) {
    res.status(500).send({ error: "Internal Server Error" });
  }
});

app.listen(5003, () => {
  console.log("server is running on port 5003");
});
