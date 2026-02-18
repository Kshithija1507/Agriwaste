import express from "express";
import { createRating, getRatings, likeRating } from "../controllers/ratingController.js";

const router = express.Router();

router.post("/", createRating);   // create new rating
router.get("/", getRatings);      // get all ratings
router.patch("/:id/like", likeRating); // like a rating

export default router;
