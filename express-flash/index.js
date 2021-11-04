const express = require("express");
const app = express();

const session = require("express-session");
const sessionOptions = {
  secret: "1337h4x0rz",
  resave: false,
  saveUninitialized: false,
};

const flash = require("connect-flash");

const methodOverride = require("method-override");

const path = require("path");

const AppError = require("./AppError");

app.use(session(sessionOptions));
app.use(flash());
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/farmStand4")
  .then(() => {
    console.log("Mongo Connection open!");
  })
  .catch((err) => {
    console.log("Mongo Connection error:");
    console.log(err);
  });

const Product = require("./models/product");
const Farm = require("./models/farm");

const categories = ["fruit", "vegetable", "dairy"];

function handleAsyncErrors(fn) {
  return function (req, res, next) {
    fn(req, res, next).catch((err) => next(err));
  };
}

app.get("/", (req, res) => {
  res.render("home", { title: "Mongoose with Express" });
});

//* PRODUCT ROUTES
app.get(
  "/products",
  handleAsyncErrors(async (req, res) => {
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
  })
);

app.get("/products/new", (req, res) => {
  res.render("products/new", { title: "New Product", categories });
});

app.post(
  "/products",
  handleAsyncErrors(async (req, res, next) => {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.redirect(`/products/${newProduct._id}`);
  })
);

app.get(
  "/products/:id",
  handleAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    const product = await Product.findById(id).populate("farm", "name");
    if (!product) {
      throw new AppError(404, "Product Not Found");
    }
    res.render("products/show", { product, title: `Viewing ${product.name}` });
  })
);

app.get(
  "/products/:id/edit",
  handleAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      throw new AppError(404, "Product Not Found");
    }
    res.render("products/edit", {
      title: `Editing ${product.name}`,
      product,
      categories,
    });
  })
);

app.put(
  "/products/:id",
  handleAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, {
      runValidators: true,
      new: true,
    });
    res.redirect(`/products/${product._id}`);
  })
);

app.delete(
  "/products/:id",
  handleAsyncErrors(async (req, res) => {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.redirect("/products");
  })
);

//* FARM ROUTES

app.use((req, res, next) => {
  res.locals.message = req.flash("success");
  next();
});

app.get("/farms", async (req, res) => {
  const farms = await Farm.find({});
  res.render("farms/index", { title: "All Farms", farms });
});

app.get("/farms/new", (req, res) => {
  res.render("farms/new", { title: "New Farm" });
});

app.post(
  "/farms",
  handleAsyncErrors(async (req, res) => {
    const newFarm = new Farm(req.body);
    await newFarm.save();
    req.flash("success", "Successfully created a new farm!");
    res.redirect("/farms");
  })
);

app.get(
  "/farms/:id",
  handleAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    const farm = await Farm.findById(id).populate("products");
    if (!farm) {
      throw new AppError(404, "Farm Not Found");
    }
    res.render("farms/show", { farm, title: `Viewing ${farm.name}` });
  })
);

app.get(
  "/farms/:id/products/new",
  handleAsyncErrors(async (req, res) => {
    const { id } = req.params;
    const farm = await Farm.findById(id);
    if (!farm) {
      throw new AppError(404, "Farm Not Found");
    }
    res.render("products/new", {
      title: `New Product for ${farm.name}`,
      categories,
      farm,
    });
  })
);

app.post(
  "/farms/:id/products",
  handleAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    const farm = await Farm.findById(id);
    if (!farm) {
      throw new AppError(404, "Farm Not Found");
    }
    const newProduct = new Product(req.body);
    farm.products.push(newProduct);
    newProduct.farm = farm;
    await farm.save();
    await newProduct.save();
    res.redirect(`/products/${newProduct._id}`);
  })
);

app.delete(
  "/farms/:id",
  handleAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    await Farm.findByIdAndDelete(id);
    res.redirect("/farms");
  })
);

function handleValidationError(err) {
  console.log(err);
  return new AppError(400, `Validation Failed: ${err.message}`);
}

app.use((err, req, res, next) => {
  // console.dir(err.name);
  if (err.name === "ValidationError") {
    err = handleValidationError(err);
  }
  next(err);
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Something went wrong :(" } = err;
  res.status(status).send(message);
});

app.listen(1337, () => {
  console.log("Listening on port 1337...");
});
