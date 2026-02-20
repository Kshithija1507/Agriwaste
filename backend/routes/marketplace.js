import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

// Get all products with filters
router.get("/", async (req, res) => {
    try {
        const { category, minPrice, maxPrice, search } = req.query;
        let query = {};

        if (category) query.category = category;
        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = Number(minPrice);
            if (maxPrice) query.price.$lte = Number(maxPrice);
        }
        if (search) {
            query.name = { $regex: search, $options: "i" };
        }

        const products = await Product.find(query).populate("seller", "username");
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "Error fetching products" });
    }
});

// Get single product
router.get("/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate("seller", "username");
        if (!product) return res.status(404).json({ message: "Product not found" });
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: "Error fetching product" });
    }
});

// Create product (Seller only - mocked auth for now)
router.post("/", async (req, res) => {
    try {
        const { name, description, price, category, wasteType, sellerId, image, stock } = req.body;

        // Validate required fields
        if (!name || !price || !category || !sellerId) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const product = new Product({
            name, description, price, category, wasteType, seller: sellerId, image, stock
        });

        await product.save();
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ message: "Error creating product", error: error.message });
    }
});

export default router;
