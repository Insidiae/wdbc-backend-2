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

const userSchema = new Schema({
  username: String,
  bio: String,
});

const tweetSchema = new Schema({
  text: String,
  likes: Number,
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const User = mongoose.model("User", userSchema);
const Tweet = mongoose.model("Tweet", tweetSchema);

// const makeTweets = async () => {
//   const newUser = new User({
//     username: "test_user",
//     bio: "test bio",
//   });

//   const tweet1 = new Tweet({
//     text: "Hello World!",
//     likes: 0,
//   });

//   const tweet2 = new Tweet({
//     text: "awesome sauce",
//     likes: 69,
//   });

//   tweet1.user = newUser;
//   tweet2.user = newUser;

//   newUser.save();
//   tweet1.save();
//   tweet2.save();
// };

// makeTweets();

const findTweet = async () => {
  const tweet = await Tweet.findOne({ text: "awesome sauce" }).populate(
    "user",
    "username"
  );

  console.log(tweet);
};

findTweet();
