const express = require("express");
const app = express();

const methodOverride = require("method-override");

const path = require("path");

app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/farmStand", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Mongo Connection open!");
  })
  .catch((err) => {
    console.log("Mongo Connection error:");
    console.log(err);
  });

const Product = require("./models/product");

const categories = ["fruit", "vegetable", "dairy"];

app.get("/", (req, res) => {
  res.render("home", { title: "Mongoose with Express" });
});

app.get("/products", async (req, res) => {
  const { category } = req.query;
  if (category) {
    const products = await Product.find({ category });
    res.render("products/index", {
      title: `Category: ${category}`,
      products,
      category,
    });
  } else {
    const products = await Product.find({});
    res.render("products/index", {
      title: "All Products",
      products,
    });
  }
});

app.get("/products/new", (req, res) => {
  res.render("products/new", { title: "New Product", categories });
});

app.post("/products", async (req, res) => {
  const newProduct = new Product(req.body);
  await newProduct.save();
  res.redirect(`/products/${newProduct._id}`);
});

app.get("/products/:id", async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  res.render("products/show", { product, title: `Viewing ${product.name}` });
});

app.get("/products/:id/edit", async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  res.render("products/edit", {
    title: `Editing ${product.name}`,
    product,
    categories,
  });
});

app.put("/products/:id", async (req, res) => {
  const { id } = req.params;
  const product = await Product.findByIdAndUpdate(id, req.body, {
    runValidators: true,
    new: true,
  });
  res.redirect(`/products/${product._id}`);
});

app.delete("/products/:id", async (req, res) => {
  const { id } = req.params;
  await Product.findByIdAndDelete(id);
  res.redirect("/products");
});

app.listen(1337, () => {
  console.log("Listening on port 1337...");
});
