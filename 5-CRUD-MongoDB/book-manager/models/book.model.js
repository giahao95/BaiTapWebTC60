const mongoose = require("mongoose");
const { Schema } = mongoose;

const bookSchema = new Schema(
  {
    title: String,
    author: String,
    publication_date: String,
    pages: Number,
    genres: [String],
    publisher: {
      name: String,
      location: String,
    },
  },
  { collection: "books" }
);

module.exports = mongoose.model("book", bookSchema);
