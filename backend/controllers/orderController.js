// controllers/orderController.js
import Order from "../models/Order.js";
import WasteToProduct from "../models/WasteToProduct.js";

export const createOrder = async (req, res) => {
  console.log("📩 Incoming createOrder request body:", req.body);
  console.log("👤 Authenticated user in req.user:", req.user);

  try {
    const { productId, quantity } = req.body;
    const buyerId = req.user?.id;

    console.log("➡️ Extracted productId:", productId);
    console.log("➡️ Extracted quantity:", quantity);
    console.log("➡️ Buyer ID from token:", buyerId);

    if (!buyerId) {
      console.warn("⚠️ No buyerId found in req.user");
      return res.status(401).json({ message: "Not authorized, missing user" });
    }

    const product = await WasteToProduct.findById(productId);
    console.log("📦 Product fetched from DB:", product);

    if (!product) {
      console.warn("❌ Product not found for ID:", productId);
      return res.status(404).json({ message: "Product not found" });
    }

    if (quantity > product.quantity) {
      console.warn(
        `⚠️ Not enough stock. Requested: ${quantity}, Available: ${product.quantity}`
      );
      return res.status(400).json({ message: "Not enough stock available" });
    }

    const totalPrice = product.price * quantity;
    console.log("💰 Calculated totalPrice:", totalPrice);

    const newOrder = new Order({
      buyer: buyerId,
      product: productId,
      quantity,
      totalPrice,
    });

    console.log("📝 New order object before save:", newOrder);

    await newOrder.save();
    console.log("✅ Order saved successfully:", newOrder._id);

    // Decrease stock from product
    product.quantity -= quantity;
    await product.save();
    console.log(
      `📉 Updated product stock. Remaining quantity: ${product.quantity}`
    );

    res.status(201).json(newOrder);
  } catch (err) {
    console.error("❌ Error Creating Order:", err.message);
    res.status(500).json({ error: err.message });
  }
};

export const getOrdersByUser = async (req, res) => {
  console.log("📩 Incoming getOrdersByUser request for user:", req.user);

  try {
    const orders = await Order.find({ buyer: req.user.id })
      .populate("product")
      .populate("buyer", "name email");

    console.log(`📦 Found ${orders.length} orders for user:`, req.user.id);
    res.json(orders);
  } catch (err) {
    console.error("❌ Error Fetching Orders:", err.message);
    res.status(500).json({ error: err.message });
  }
};
