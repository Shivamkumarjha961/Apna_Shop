const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      id: Number,
      name: String,
      price: Number,
      img: String,
      image: String,
      selectedSize: String,
      mrp: Number,
      title: String,
      category: String,
    },
  ],
});

module.exports = mongoose.model("Wishlist", wishlistSchema);
