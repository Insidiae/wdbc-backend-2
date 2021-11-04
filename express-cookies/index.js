const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");
app.use(cookieParser("the_force"));

app.get("/greet", (req, res) => {
  if (req.cookies.name !== "General Kenobi") {
    res.send("Hello there!");
  } else {
    if (req.signedCookies.training === "Jedi Arts") {
      res.send(
        "You fool! I've been trained in your Jedi Arts... by Count Dooku!"
      );
    } else {
      res.send("You are a bold one...");
    }
  }
});

app.get("/grievous", (req, res) => {
  res.cookie("name", "General Kenobi");
  res.send("General Kenobi!");
});

app.get("/jediArts", (req, res) => {
  res.cookie("training", "Jedi Arts", { signed: true });
  res.send("I will deal with this Jedi slime myself!");
});

app.listen(1337, () => {
  console.log("Listening on port 1337...");
});
