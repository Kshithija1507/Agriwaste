import express from "express";
import { createSuggestion, getSuggestions, likeSuggestion } from "../controllers/suggestionController.js";

const router = express.Router();

router.post("/", createSuggestion);   // create new suggestion
router.get("/", getSuggestions);      // get all suggestions
router.patch("/:id/like", likeSuggestion); // like a suggestion

export default router;
