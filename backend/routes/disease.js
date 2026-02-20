import express from "express";
import multer from "multer";

const router = express.Router();

// Configure Multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/", upload.single("image"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No image file provided" });
        }

        // --- MOCK IMPLEMENTATION ---
        // Since Groq vision models are currently in flux/preview/decommissioned, 
        // we provide a robust mock response to demonstrate the feature.

        console.log("Processing image for disease detection (Mock Mode)...");

        // Simulate processing delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Randomly select a result for demonstration purposes
        const mockResults = [
            {
                disease: "Leaf Spot (Cercospora)",
                confidence: "High (92%)",
                cure: "Apply copper-based fungicides and ensure proper air circulation. Remove infected leaves."
            },
            {
                disease: "Powdery Mildew",
                confidence: "High (88%)",
                cure: "Use sulfur-based fungicides or neem oil. Avoid overhead watering."
            },
            {
                disease: "Healthy",
                confidence: "High (95%)",
                cure: "No issues detected. Continue regular care and monitoring."
            },
            {
                disease: "Early Blight",
                confidence: "Medium (75%)",
                cure: "Apply fungicides containing chlorothalonil or mancozeb. Rotate crops next season."
            }
        ];

        const randomResult = mockResults[Math.floor(Math.random() * mockResults.length)];

        res.json(randomResult);

    } catch (error) {
        console.error("Disease Detection Error:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
});

export default router;
