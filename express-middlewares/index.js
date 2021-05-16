const express = require("express");
const app = express();
const morgan = require("morgan");

app.use(morgan("dev"));

// app.use((req, res, next) => {
//   console.log("THIS IS THE FIRST MIDDLEWARE!!!");
//   next();
//   console.log("THIS IS THE FIRST MIDDLEWARE!!! - AFTER CALLING NEXT()");
// });

// app.use((req, res, next) => {
//   console.log("THIS IS THE SECOND MIDDLEWARE!!!");
//   return next();
//   console.log("nope");
// });

const verifyPassword = (req, res, next) => {
  const { password } = req.query;
  if (password === "1337h4x0rz") {
    return next();
  }
  res.status(403).send("Please enter the super secret password!");
};

app.use((req, res, next) => {
  req.requestTime = Date.now();
  console.log(req.method.toUpperCase(), req.path);
  next();
});

app.get("/", (req, res) => {
  console.log(`Requested at: ${req.requestTime}`);
  res.send("Home page!");
});

app.get("/dogs", (req, res) => {
  console.log(`Requested at: ${req.requestTime}`);
  res.send("WOOF.");
});

app.get("/secret", verifyPassword, (req, res) => {
  res.send("Welcome to the super secret page!");
});

app.use((req, res) => {
  res.status(404).send("404 NOT FOUND");
});

app.listen(1337, () => {
  console.log("Listening on port 1337...");
});
