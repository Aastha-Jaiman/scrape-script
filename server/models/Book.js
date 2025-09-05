const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: String,
  price: String,
  availability: String,
  rating: String,
  url: String,
});

module.exports = mongoose.model("Book", bookSchema);
