const express = require("express");
const app = express();

const path = require("path");

const subredditData = require("./data.json");

app.use(express.static(path.join(__dirname, "/public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.get("/", (req, res) => {
  res.render("home", { title: "Home Page" });
});

app.get("/rand", (req, res) => {
  const randNum = Math.floor(Math.random() * 10) + 1;
  res.render("rand", { title: "Random Number", randNum });
});

app.get("/r/:subreddit", (req, res) => {
  const { subreddit } = req.params;
  res.render("subreddit", {
    title: `r/${subreddit}`,
    subreddit,
    subredditData,
  });
});

app.get("/cats", (req, res) => {
  const cats = ["Blue", "Rocket", "Monty", "Stephanie", "Winston"];
  res.render("cats", { title: "Cat.", cats });
});

app.listen(1337, () => {
  console.log("Listening on port 1337...");
});
