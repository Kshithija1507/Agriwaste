
import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema(
  {
    user: { type: String, default: "Anonymous" },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
    category: {
      type: String,
      enum: ["General", "Tutorial", "Marketplace", "Suggestion Tool", "Impact Tracker"],
      default: "General",
    },
    likes: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("Rating", ratingSchema);
