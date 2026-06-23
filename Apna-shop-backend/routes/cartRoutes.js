const express = require("express");
const Cart = require("../models/cartModel");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.use(authMiddleware);

// GET user cart
router.get("/:userId", async (req, res) => {
  if (req.user.userId !== req.params.userId) {
    return res.status(403).json({ message: "Forbidden: Access denied." });
  }
  const cart = await Cart.findOne({ userId: req.params.userId });
  res.json(cart || { items: [] });
});

// ADD item
router.post("/", async (req, res) => {
  const { item } = req.body;
  const userId = req.user.userId;

  let cart = await Cart.findOne({ userId });

  if (!cart) {
    cart = new Cart({ userId, items: [item] });
  } else {
    const exists = cart.items.some(
      (i) =>
        i.name === item.name &&
        i.selectedSize === item.selectedSize
    );

    if (!exists) {
      cart.items.push(item);
    }
  }

  await cart.save();
  res.json(cart);
});

// CLEAR cart
router.delete("/:userId", async (req, res) => {
  if (req.user.userId !== req.params.userId) {
    return res.status(403).json({ message: "Forbidden: Access denied." });
  }
  await Cart.findOneAndDelete({ userId: req.params.userId });
  res.json({ message: "Cart cleared" });
});

// SYNC/UPDATE cart
router.put("/:userId", async (req, res) => {
  if (req.user.userId !== req.params.userId) {
    return res.status(403).json({ message: "Forbidden: Access denied." });
  }
  try {
    const { items } = req.body;
    const cart = await Cart.findOneAndUpdate(
      { userId: req.params.userId },
      { items },
      { upsert: true, new: true }
    );
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: "Error syncing cart", error: error.message });
  }
});

module.exports = router;