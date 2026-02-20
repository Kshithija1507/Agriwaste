import express from "express";
import { getChatbotResponse } from "../services/groqService.js";

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const { messages, language } = req.body;

        if (!messages || !Array.isArray(messages)) {
            return res.status(400).json({ message: "Invalid message format required. Array of messages expected." });
        }

        // Call AI Service
        const aiResponse = await getChatbotResponse(messages, language || 'en');

        res.status(200).json({
            message: "Chat response fetched successfully",
            reply: aiResponse
        });

    } catch (error) {
        console.error("Chat Endpoint Error:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
});

export default router;
