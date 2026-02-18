import Suggestion from "../models/Suggestion.js";

// ✅ Create Suggestion
export const createSuggestion = async (req, res) => {
  try {
    const suggestion = new Suggestion(req.body);
    const saved = await suggestion.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// 📋 Get All Suggestions
export const getSuggestions = async (req, res) => {
  try {
    const suggestions = await Suggestion.find().sort({ createdAt: -1 });
    res.json(suggestions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 👍 Like Suggestion
export const likeSuggestion = async (req, res) => {
  try {
    const updated = await Suggestion.findByIdAndUpdate(
      req.params.id,
      { $inc: { likes: 1 } },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
