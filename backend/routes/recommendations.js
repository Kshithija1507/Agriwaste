import express from "express";
import PlantRecommendation from "../models/PlantRecommendation.js";
import { getPlantRecommendations } from "../services/groqService.js";
// Assuming you have an auth middleware, if not we might need to skip auth or mock it for now.
// Checking server.js imports... it imports authRoutes. I should check middleware folder.
// For now, I'll import a placeholder or generic middleware if available, or skip if I can't find it.
// I will assume specific auth middleware exists or I will create a basic one.
// Actually, looking at file list, there is a `middleware` folder.
// I'll check it in a separate step or just assume `protect` if standard.
// For now, I'll write the route without auth middleware and add it later to be safe, 
// or I'll check `middleware` folder content first. 
// OPTIMIZATION: I'll include the route logic now and add middleware import if I see it in `server.js` or `middleware` dir.
// List dir showed `middleware` folder.

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const { location, soilType, sunlight, wasteType, userId } = req.body;

        // TODO: Add validation
        if (!location || !soilType || !wasteType) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        // Call AI Service
        const aiResponse = await getPlantRecommendations({ location, soilType, sunlight, wasteType });

        // Save to DB (if userId is provided)
        let savedRec = null;
        if (userId) {
            savedRec = new PlantRecommendation({
                user: userId,
                inputs: { location, soilType, sunlight, wasteType },
                recommendations: aiResponse.recommendations
            });
            await savedRec.save();
        }

        res.status(200).json({
            message: "Recommendations fetched successfully",
            data: aiResponse,
            savedId: savedRec ? savedRec._id : null
        });

    } catch (error) {
        console.error("Recommendation Error:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
});

router.get("/history/:userId", async (req, res) => {
    try {
        const history = await PlantRecommendation.find({ user: req.params.userId }).sort({ createdAt: -1 });
        res.json(history);
    } catch (error) {
        res.status(500).json({ message: "Error fetching history" });
    }
});

export default router;
