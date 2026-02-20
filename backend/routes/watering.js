import express from "express";
import WateringSchedule from "../models/WateringSchedule.js";

const router = express.Router();

// Helper to calculate next watering date
const calculateNextWatering = (frequency) => {
    const date = new Date();
    date.setDate(date.getDate() + frequency);
    return date;
};

// Create a new schedule
router.post("/", async (req, res) => {
    try {
        const { userId, plantName, potSize, soilType } = req.body;

        // Simple algorithm for frequency
        let frequency = 2; // Default 2 days
        if (plantName.toLowerCase().includes("cactus") || plantName.toLowerCase().includes("succulent")) {
            frequency = 7;
        } else if (potSize === "Large") {
            frequency += 1; // Holds more water
        }
        if (soilType === "Clay") {
            frequency += 1; // Retains water
        } else if (soilType === "Sandy") {
            frequency -= 1; // Drains fast
        }
        if (frequency < 1) frequency = 1;

        const nextWatering = calculateNextWatering(frequency);

        const schedule = new WateringSchedule({
            user: userId,
            plantName,
            potSize,
            soilType,
            waterFrequency: frequency,
            nextWatering
        });

        await schedule.save();
        res.status(201).json(schedule);
    } catch (error) {
        res.status(500).json({ message: "Error creating schedule", error: error.message });
    }
});

// Get all schedules for a user
router.get("/:userId", async (req, res) => {
    try {
        const schedules = await WateringSchedule.find({ user: req.params.userId });
        res.json(schedules);
    } catch (error) {
        res.status(500).json({ message: "Error fetching schedules" });
    }
});

// Mark as watered
router.put("/:id/water", async (req, res) => {
    try {
        const schedule = await WateringSchedule.findById(req.params.id);
        if (!schedule) return res.status(404).json({ message: "Schedule not found" });

        schedule.lastWatered = new Date();
        schedule.nextWatering = calculateNextWatering(schedule.waterFrequency);
        await schedule.save();

        res.json(schedule);
    } catch (error) {
        res.status(500).json({ message: "Error updating schedule" });
    }
});

// Delete schedule
router.delete("/:id", async (req, res) => {
    try {
        await WateringSchedule.findByIdAndDelete(req.params.id);
        res.json({ message: "Schedule deleted" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting schedule" });
    }
});

export default router;
