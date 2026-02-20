import mongoose from "mongoose";

const plantRecommendationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    inputs: {
        location: String,
        soilType: String,
        sunlight: String,
        wasteType: String,
    },
    recommendations: [
        {
            plantName: String,
            growthTime: String,
            yield: String,
            wasteUsageRatio: String,
            confidence: Number,
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model("PlantRecommendation", plantRecommendationSchema);
