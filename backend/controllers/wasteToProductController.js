import WasteToProduct from "../models/WasteToProduct.js";

// ➕ Create new waste listing
export const createWaste = async (req, res) => {
  try {
    console.log("📩 CreateWaste Request Body:", req.body);

    const newWaste = new WasteToProduct(req.body);
    const savedWaste = await newWaste.save();

    console.log("✅ Waste Created:", savedWaste);
    res.status(201).json(savedWaste);
  } catch (err) {
    console.error("❌ Error Creating Waste:", err.message);
    res.status(400).json({ error: err.message });
  }
};

// 📋 Get all waste listings
export const getAllWaste = async (req, res) => {
  try {
    console.log("📩 Fetching All Waste Listings...");

    const wastes = await WasteToProduct.find().populate("user");

    console.log(`✅ Found ${wastes.length} Waste Listings`);
    res.json(wastes);
  } catch (err) {
    console.error("❌ Error Fetching All Waste:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// 🔍 Get single waste listing
export const getWasteById = async (req, res) => {
  try {
    console.log("📩 Fetching Waste By ID:", req.params.id);

    const waste = await WasteToProduct.findById(req.params.id).populate("user");

    if (!waste) {
      console.warn("⚠️ Waste Not Found:", req.params.id);
      return res.status(404).json({ message: "Waste not found" });
    }

    console.log("✅ Waste Found:", waste);
    res.json(waste);
  } catch (err) {
    console.error("❌ Error Fetching Waste By ID:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// ✏️ Update listing
export const updateWaste = async (req, res) => {
  try {
    console.log("📩 UpdateWaste Request:", { id: req.params.id, body: req.body });

    const updatedWaste = await WasteToProduct.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedWaste) {
      console.warn("⚠️ Waste Not Found for Update:", req.params.id);
      return res.status(404).json({ message: "Waste not found" });
    }

    console.log("✅ Waste Updated:", updatedWaste);
    res.json(updatedWaste);
  } catch (err) {
    console.error("❌ Error Updating Waste:", err.message);
    res.status(400).json({ error: err.message });
  }
};

// 🗑️ Delete listing
export const deleteWaste = async (req, res) => {
  try {
    console.log("📩 DeleteWaste Request for ID:", req.params.id);

    const deletedWaste = await WasteToProduct.findByIdAndDelete(req.params.id);

    if (!deletedWaste) {
      console.warn("⚠️ Waste Not Found for Deletion:", req.params.id);
      return res.status(404).json({ message: "Waste not found" });
    }

    console.log("✅ Waste Deleted:", deletedWaste._id);
    res.json({ message: "Waste deleted successfully" });
  } catch (err) {
    console.error("❌ Error Deleting Waste:", err.message);
    res.status(500).json({ error: err.message });
  }
};
