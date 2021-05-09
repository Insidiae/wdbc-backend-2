const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/movieApp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connection open!");
  })
  .catch((err) => {
    console.log("oh no an error:");
    console.log(err);
  });

const movieSchema = new mongoose.Schema({
  title: String,
  year: Number,
  score: Number,
  rating: String,
});

const Movie = mongoose.model("Movie", movieSchema);

//* Insert some dummy data into the database:
// Movie.insertMany([
//   {
//     title: "Amadeus",
//     year: 1986,
//     score: 92,
//     rating: "R",
//   },
//   {
//     title: "Amelie",
//     year: 2001,
//     score: 83,
//     rating: "R",
//   },
//   {
//     title: "Alien",
//     year: 1979,
//     score: 81,
//     rating: "R",
//   },
//   {
//     title: "Moonrise Kingdom",
//     year: 2012,
//     score: 73,
//     rating: "PG-13",
//   },
//   {
//     title: "Stand By Me",
//     year: 1986,
//     score: 86,
//     rating: "R",
//   },
//   {
//     title: "The Iton Giant",
//     year: 1999,
//     score: 75,
//     rating: "PG",
//   },
// ])
//   .then((data) => {
//     console.log("Successfully inserted the ff. movies:");
//     console.log(data);
//   })
//   .catch((err) => {
//     console.log("oh no an error:");
//     console.log(err);
//   });
