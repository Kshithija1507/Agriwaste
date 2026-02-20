import mongoose from "mongoose";

const weatherCacheSchema = new mongoose.Schema({
    location: { type: String, required: true, unique: true },
    data: { type: Object, required: true },
    lastUpdated: { type: Date, default: Date.now },
});

export default mongoose.model("WeatherCache", weatherCacheSchema);
