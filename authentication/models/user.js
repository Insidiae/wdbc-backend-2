const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username cannot be blank."],
  },
  password: {
    type: String,
    required: [true, "Password cannot be blank."],
  },
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

userSchema.statics.findAndValidate = async function (username, password) {
  const foundUser = await this.findOne({ username });
  if (!foundUser) return null;
  const isValidPassword = await bcrypt.compare(password, foundUser.password);

  return isValidPassword ? foundUser : null;
};

module.exports = mongoose.model("User", userSchema);
