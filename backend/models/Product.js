import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: {
        type: String,
        required: true,
        enum: ["Fertilizer", "Compost", "Tools", "Seeds", "Other"]
    },
    wasteType: { type: String }, // optional, for filtering by waste usage
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    image: { type: String, default: "https://via.placeholder.com/150" },
    rating: { type: Number, default: 0 },
    numReviews: { type: Number, default: 0 },
    stock: { type: Number, default: 10, required: true },
}, { timestamps: true });

export default mongoose.model("Product", productSchema);
