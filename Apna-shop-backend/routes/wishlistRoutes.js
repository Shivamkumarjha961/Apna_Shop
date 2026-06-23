const express = require("express");
const Wishlist = require("../models/wishlistModel");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.use(authMiddleware);

// GET user wishlist
router.get("/:userId", async (req, res) => {
  if (req.user.userId !== req.params.userId) {
    return res.status(403).json({ message: "Forbidden: Access denied." });
  }
  try {
    const wishlist = await Wishlist.findOne({ userId: req.params.userId });
    res.json(wishlist || { items: [] });
  } catch (error) {
    res.status(500).json({ message: "Error fetching wishlist", error: error.message });
  }
});

// SYNC/UPDATE wishlist
router.put("/:userId", async (req, res) => {
  if (req.user.userId !== req.params.userId) {
    return res.status(403).json({ message: "Forbidden: Access denied." });
  }
  try {
    const { items } = req.body;
    const wishlist = await Wishlist.findOneAndUpdate(
      { userId: req.params.userId },
      { items },
      { upsert: true, new: true }
    );
    res.json(wishlist);
  } catch (error) {
    res.status(500).json({ message: "Error syncing wishlist", error: error.message });
  }
});

// CLEAR wishlist
router.delete("/:userId", async (req, res) => {
  if (req.user.userId !== req.params.userId) {
    return res.status(403).json({ message: "Forbidden: Access denied." });
  }
  try {
    await Wishlist.findOneAndDelete({ userId: req.params.userId });
    res.json({ message: "Wishlist cleared" });
  } catch (error) {
    res.status(500).json({ message: "Error clearing wishlist", error: error.message });
  }
});

module.exports = router;
