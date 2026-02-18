import express from "express";
import {
  createWaste,
  getAllWaste,
  getWasteById,
  updateWaste,
  deleteWaste,
} from "../controllers/wasteToProductController.js";

const router = express.Router();

// ➕ Create new listing
router.post("/", createWaste);

// 📋 Get all listings
router.get("/", getAllWaste);

// 🔍 Get single listing
router.get("/:id", getWasteById);

// ✏️ Update listing
router.put("/:id", updateWaste);

// 🗑️ Delete listing
router.delete("/:id", deleteWaste);

export default router;
