const mongoose = require("mongoose");
const { Schema } = mongoose;

mongoose
  .connect("mongodb://localhost:27017/relationshipDemo", {
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

const productSchema = new Schema({
  name: String,
  price: Number,
  season: {
    type: String,
    enum: ["Winter", "Spring", "Summer", "Fall"],
  },
});

const farmSchema = new Schema({
  name: String,
  city: String,
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
});

const Product = mongoose.model("Product", productSchema);
const Farm = mongoose.model("Farm", farmSchema);

// Product.insertMany([
//   { name: "Goddess Melon", price: 420, season: "Summer" },
//   { name: "Sugar Baby Watermelon", price: 696, season: "Summer" },
//   { name: "Asparagus", price: 1337, season: "Spring" },
// ]);

const makeFarm = async () => {
  const newFarm = new Farm({
    name: "Full Belly Farms",
    city: "Guinda, CA",
  });

  const melon = await Product.findOne({ name: "Goddess Melon" });
  newFarm.products.push(melon);
  const res = await newFarm.save();
  console.log(res);
};

// makeFarm();

const addProduct = async () => {
  const farm = await Farm.findOne({ name: "Full Belly Farms" });
  const watermelon = await Product.findOne({ name: "Sugar Baby Watermelon" });

  farm.products.push(watermelon);
  const res = await farm.save();
  console.log(res);
};

// addProduct();

Farm.findOne({ name: "Full Belly Farms" })
  .populate("products")
  .then((farm) => console.log(farm));
