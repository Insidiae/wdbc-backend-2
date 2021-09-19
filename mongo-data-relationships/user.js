const mongoose = require("mongoose");

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

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  address: [
    {
      _id: { id: false },
      street: String,
      city: String,
      state: String,
      country: String,
    },
  ],
});

const User = mongoose.model("User", userSchema);

const makeUser = async () => {
  const newUser = new User({
    firstName: "John",
    lastName: "Smith",
  });

  newUser.address.push({
    street: "123 Nondescript Street",
    city: "Nowhereville",
    state: "TX",
    country: "USA",
  });

  const res = await newUser.save();
  console.log(res);
};

// makeUser();

const addAddress = async (id) => {
  const user = await User.findById(id);
  user.address.push({
    street: "123 Some Other Street",
    city: "Some Other City",
    state: "CA",
    country: "USA",
  });

  const res = await user.save();
  console.log(res);
};

addAddress("60b37d50c9322943c44fbc5b");
