import mongoose from "mongoose";

const wateringScheduleSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    plantName: { type: String, required: true },
    potSize: { type: String, required: true }, // e.g., "Small", "Medium", "Large"
    soilType: { type: String, required: true },
    waterFrequency: { type: Number, required: true }, // in days
    lastWatered: { type: Date, default: Date.now },
    nextWatering: { type: Date, required: true },
    active: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.model("WateringSchedule", wateringScheduleSchema);
