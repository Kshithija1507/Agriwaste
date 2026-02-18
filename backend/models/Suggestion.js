
import mongoose from "mongoose";

const suggestionSchema = new mongoose.Schema(
  {
    user: { type: String, default: "Anonymous" },
    title: { type: String, required: true },
    description: { type: String, required: true },
    likes: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("Suggestion", suggestionSchema);
