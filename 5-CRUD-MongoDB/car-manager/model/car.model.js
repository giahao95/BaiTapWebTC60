const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CarSchema = new Schema({
  name: String,
  manufacturer: String,
  price: Number,
});

module.exports = mongoose.model("car", CarSchema);
