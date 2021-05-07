const express = require("express");
const app = express();

// app.use((req, res) => {
//   console.log("WE GOT A NEW REQUEST");
//   res.send("<h1>Hello Express!</h1>");
// });

app.get("/", (req, res) => {
  res.send("<h1>Welcome to the Home Page!</h1>");
});

app.get("/cats", (req, res) => {
  res.send("<h1>MEOW!</h1>");
});

app.post("/cats", (req, res) => {
  res.send("POST request to /cats");
});

app.get("/dogs", (req, res) => {
  res.send("<h1>WOOF!</h1>");
});

app.post("/dogs", (req, res) => {
  res.send("POST request to /dogs");
});

app.get("/r/:subreddit", (req, res) => {
  const { subreddit } = req.params;
  res.send(`<h1>r/${subreddit} Subreddit Page</h1>`);
});

app.get("/r/:subreddit/:postId", (req, res) => {
  const { subreddit, postId } = req.params;
  res.send(`<h1>Viewing Post ID ${postId} on r/${subreddit}</h1>`);
});

app.get("/search", (req, res) => {
  const { q } = req.query;
  res.send(
    `<h1>${
      q
        ? `Searching for ${q}...`
        : "<em>Nothing found if nothing searched.</em>"
    }</h1>`
  );
});

app.get("*", (req, res) => {
  res.send("404 Not Found");
});

app.listen(1337, () => {
  console.log("Listening on port 1337...");
});
