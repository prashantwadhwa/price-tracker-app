const mongoose = require("mongoose");

const priceHistorySchema = new mongoose.Schema({
  price: Number,
  date: {
    type: Date,
    default: Date.now,
  },
});

const productSchema = new mongoose.Schema({
  title: String,
  price: Number,
  image: String,
  productURL: {
    type: String,
    required: true,
    unique: true,
  },
  store: String,

  priceHistory: [priceHistorySchema],

  lowestPrice: {
    type: Number,
  },

  lastChecked: {
    type: Date,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const productModel = mongoose.model("Product", productSchema);

module.exports = productModel;
