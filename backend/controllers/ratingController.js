import Rating from "../models/Rating.js";

// ✅ Create Rating
export const createRating = async (req, res) => {
  try {
    const rating = new Rating(req.body);
    const saved = await rating.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// 📋 Get All Ratings
export const getRatings = async (req, res) => {
  try {
    const ratings = await Rating.find().sort({ createdAt: -1 });
    res.json(ratings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 👍 Like Rating
export const likeRating = async (req, res) => {
  try {
    const updated = await Rating.findByIdAndUpdate(
      req.params.id,
      { $inc: { likes: 1 } },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
