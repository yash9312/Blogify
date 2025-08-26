const mongoose = require("mongoose");

// Connect to MongoDB using Mongoose
const Connected = async (url) => {
  const connecting = await mongoose
    .connect(url)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.error("Error connecting to MongoDB:", err);
    });
  return connecting;
};

module.exports = {
  Connected,
};
