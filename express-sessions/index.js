const express = require("express");
const app = express();
const session = require("express-session");

const sessionOptions = {
  secret: "1337h4x0rz",
  resave: false,
  saveUninitialized: false,
};
app.use(session(sessionOptions));

app.get("/viewcount", (req, res) => {
  req.session.count = (req.session.count ?? 0) + 1;
  res.send(`You viewed this page ${req.session.count} times`);
});

app.get("/login", (req, res) => {
  const { username = "Anonymous" } = req.query;
  req.session.username = username;
  res.redirect("/greet");
});

app.get("/greet", (req, res) => {
  res.send(`Hello there, ${req.session.username}!`);
});

app.listen(1337, () => {
  console.log("Listening on port 1337...");
});
