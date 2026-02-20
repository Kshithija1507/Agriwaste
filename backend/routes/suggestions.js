import express from "express";
import { createSuggestion, getSuggestions, likeSuggestion, getAiSuggestionsController } from "../controllers/suggestionController.js";

const router = express.Router();

router.post("/", createSuggestion);   // create new suggestion
router.get("/", getSuggestions);      // get all suggestions
router.patch("/:id/like", likeSuggestion); // like a suggestion
router.post("/ai", getAiSuggestionsController); // Get AI suggestions

export default router;
