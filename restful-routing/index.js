const express = require("express");
const app = express();

const { v4: uuidv4 } = require("uuid");
const methodOverride = require("method-override");

const path = require("path");

app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

let comments = [
  {
    id: uuidv4(),
    username: "Todd",
    body: "lol that is so funny!",
  },
  {
    id: uuidv4(),
    username: "Skyler",
    body: "I like to go birdwatching with my dog",
  },
  {
    id: uuidv4(),
    username: "Sk8erBoi",
    body: "plz delete ur account todd",
  },
  {
    id: uuidv4(),
    username: "dog",
    body: "woof woof woof",
  },
];

app.get("/", (req, res) => {
  res.render("home", { title: "Home Page" });
});

app.get("/comments", (req, res) => {
  res.render("comments/index", { title: "All Comments", comments });
});

app.get("/comments/new", (req, res) => {
  res.render("comments/new", { title: "New Comment" });
});

app.post("/comments", (req, res) => {
  const { username, comment } = req.body;
  comments.push({ username, body: comment, id: uuidv4() });
  res.redirect("/comments");
});

app.get("/comments/:id", (req, res) => {
  const { id } = req.params;
  const comment = comments.find((c) => c.id === id);
  res.render("comments/show", {
    title: `${comment.username}'s comment`,
    comment,
  });
});

app.patch("/comments/:id", (req, res) => {
  const { id } = req.params;
  const newCommentText = req.body.comment;
  const comment = comments.find((c) => c.id === id);
  comment.body = newCommentText;
  res.redirect(`/comments/${id}`);
});

app.get("/comments/:id/edit", (req, res) => {
  const { id } = req.params;
  const comment = comments.find((c) => c.id === id);
  res.render("comments/edit", {
    title: `Editing ${comment.username}'s comment`,
    comment,
  });
});

app.delete("/comments/:id", (req, res) => {
  const { id } = req.params;
  comments = comments.filter((c) => c.id !== id);
  res.redirect("/comments");
});

app.listen(1337, () => {
  console.log("Listening on port 1337...");
});
