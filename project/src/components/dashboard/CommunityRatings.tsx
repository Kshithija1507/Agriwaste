import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  MessageCircle,
  Star,
  Send,
  ThumbsUp,
  User,
  Lightbulb,
  Plus,
} from "lucide-react";

// ✅ Types
interface Rating {
  _id: string;
  user?: string;
  rating: number;
  comment: string;
  category: string;
  likes?: number;
  date?: string;
}

interface Suggestion {
  _id: string;
  user?: string;
  title: string;
  description: string;
  likes?: number;
  date?: string;
}

const CommunityRatings: React.FC = () => {
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);

  const [newRating, setNewRating] = useState<Omit<Rating, "_id">>({
    rating: 5,
    comment: "",
    category: "General",
    user: "Anonymous",
    likes: 0,
    date: new Date().toISOString(),
  });

  const [newSuggestion, setNewSuggestion] = useState<Omit<Suggestion, "_id">>({
    title: "",
    description: "",
    user: "Anonymous",
    likes: 0,
    date: new Date().toISOString(),
  });

  const [showRatingForm, setShowRatingForm] = useState(false);
  const [showSuggestionForm, setShowSuggestionForm] = useState(false);
  const [activeTab, setActiveTab] = useState<"suggestions" | "reviews">(
    "suggestions"
  );

  const API_URL = "http://localhost:5000/api";

  // ✅ Fetch ratings
  useEffect(() => {
    axios
      .get(`${API_URL}/ratings`)
      .then((res) => setRatings(res.data))
      .catch((err) => console.error(err));
  }, []);

  // ✅ Fetch suggestions
  useEffect(() => {
    axios
      .get(`${API_URL}/suggestions`)
      .then((res) => setSuggestions(res.data))
      .catch((err) => console.error(err));
  }, []);

  // ✅ Submit new rating
  const handleSubmitRating = () => {
    if (newRating.comment.trim()) {
      axios
        .post(`${API_URL}/ratings`, newRating)
        .then((res) => {
          setRatings([res.data, ...ratings]);
          setNewRating({
            rating: 5,
            comment: "",
            category: "General",
            user: "Anonymous",
            likes: 0,
            date: new Date().toISOString(),
          });
          setShowRatingForm(false);
        })
        .catch((err) => console.error(err));
    }
  };

  // ✅ Submit new suggestion
  const handleSubmitSuggestion = () => {
    if (newSuggestion.title.trim() && newSuggestion.description.trim()) {
      axios
        .post(`${API_URL}/suggestions`, newSuggestion)
        .then((res) => {
          setSuggestions([res.data, ...suggestions]);
          setNewSuggestion({
            title: "",
            description: "",
            user: "Anonymous",
            likes: 0,
            date: new Date().toISOString(),
          });
          setShowSuggestionForm(false);
        })
        .catch((err) => console.error(err));
    }
  };

  // ✅ Like rating
  const handleLikeRating = (id: string) => {
    axios
      .patch(`${API_URL}/ratings/${id}/like`)
      .then((res) => {
        const updated = res.data;
        setRatings(ratings.map((r) => (r._id === updated._id ? updated : r)));
      })
      .catch((err) => console.error(err));
  };

  // ✅ Like suggestion
  const handleLikeSuggestion = (id: string) => {
    axios
      .patch(`${API_URL}/suggestions/${id}/like`)
      .then((res) => {
        const updated = res.data;
        setSuggestions(
          suggestions.map((s) => (s._id === updated._id ? updated : s))
        );
      })
      .catch((err) => console.error(err));
  };

  // ✅ Render stars
  const renderStars = (
    rating: number,
    interactive = false,
    onChange?: (r: number) => void
  ) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-5 w-5 ${
              star <= rating ? "text-yellow-400 fill-current" : "text-gray-300"
            } ${interactive ? "cursor-pointer hover:text-yellow-400" : ""}`}
            onClick={() => interactive && onChange && onChange(star)}
          />
        ))}
      </div>
    );
  };

  const averageRating =
    ratings.length > 0
      ? ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length
      : 0;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      {/* ✅ Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <MessageCircle className="h-6 w-6 mr-2 text-green-600" />
          <h2 className="text-2xl font-bold text-gray-900">Community Hub</h2>
        </div>
      </div>

      {/* ✅ Tab Navigation */}
      <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg">
        <button
          onClick={() => setActiveTab("suggestions")}
          className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
            activeTab === "suggestions"
              ? "bg-white text-gray-900 shadow-sm"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          <Lightbulb className="h-4 w-4 mr-2" />
          Community Suggestions
        </button>
        <button
          onClick={() => setActiveTab("reviews")}
          className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
            activeTab === "reviews"
              ? "bg-white text-gray-900 shadow-sm"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          <Star className="h-4 w-4 mr-2" />
          Reviews & Feedback
        </button>
      </div>

      {/* Suggestions & Reviews UI remains same (unchanged code below)... */}
      {/* ✅ Suggestions Tab */}
      {activeTab === "suggestions" && (
        <div className="space-y-6">
          {/* Form Toggle */}
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900">
              Share Your Ideas
            </h3>
            <button
              onClick={() => setShowSuggestionForm(!showSuggestionForm)}
              className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Suggestion
            </button>
          </div>

          {/* Suggestion Form */}
          {showSuggestionForm && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-4">Share Your Waste Reuse Idea</h4>
              <div className="space-y-4">
                <input
                  type="text"
                  value={newSuggestion.title}
                  onChange={(e) =>
                    setNewSuggestion({ ...newSuggestion, title: e.target.value })
                  }
                  placeholder="Suggestion title"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
                <textarea
                  value={newSuggestion.description}
                  onChange={(e) =>
                    setNewSuggestion({
                      ...newSuggestion,
                      description: e.target.value,
                    })
                  }
                  placeholder="Describe your idea..."
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
                <div className="flex space-x-2">
                  <button
                    onClick={handleSubmitSuggestion}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    Submit Suggestion
                  </button>
                  <button
                    onClick={() => setShowSuggestionForm(false)}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Suggestions List */}
          <div className="space-y-4">
            {suggestions.map((s) => (
              <div
                key={s._id}
                className="border border-gray-200 rounded-lg p-4"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center">
                    <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                      <User className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">
                        {s.user || "Anonymous"}
                      </h4>
                      <span className="text-sm text-gray-500">
                        {s.date || "Recently"}
                      </span>
                    </div>
                  </div>
                </div>
                <h5 className="font-semibold text-gray-900 mb-2">{s.title}</h5>
                <p className="text-gray-700 mb-3">{s.description}</p>
                <button
                  onClick={() => handleLikeSuggestion(s._id)}
                  className="flex items-center space-x-1 text-gray-500 hover:text-green-600"
                >
                  <ThumbsUp className="h-4 w-4" />
                  <span className="text-sm">{s.likes || 0}</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ✅ Reviews Tab */}
      {activeTab === "reviews" && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center mb-2">
                  <span className="text-3xl font-bold text-green-900 mr-2">
                    {averageRating.toFixed(1)}
                  </span>
                  {renderStars(Math.round(averageRating))}
                </div>
                <p className="text-sm text-green-700">
                  Based on {ratings.length} reviews
                </p>
              </div>
            </div>
          </div>

          {/* Review Form Toggle */}
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900">
              Platform Reviews
            </h3>
            <button
              onClick={() => setShowRatingForm(!showRatingForm)}
              className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              <Send className="h-4 w-4 mr-2" />
              Add Review
            </button>
          </div>

          {/* Review Form */}
          {showRatingForm && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-4">Share Your Experience</h4>
              <div className="space-y-4">
                {renderStars(newRating.rating, true, (r) =>
                  setNewRating({ ...newRating, rating: r })
                )}
                <select
                  value={newRating.category}
                  onChange={(e) =>
                    setNewRating({ ...newRating, category: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="General">General</option>
                  <option value="Tutorial">Tutorial</option>
                  <option value="Marketplace">Marketplace</option>
                  <option value="Suggestion Tool">Suggestion Tool</option>
                  <option value="Impact Tracker">Impact Tracker</option>
                </select>
                <textarea
                  value={newRating.comment}
                  onChange={(e) =>
                    setNewRating({ ...newRating, comment: e.target.value })
                  }
                  placeholder="Share your experience..."
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
                <div className="flex space-x-2">
                  <button
                    onClick={handleSubmitRating}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    Submit Review
                  </button>
                  <button
                    onClick={() => setShowRatingForm(false)}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Ratings List */}
          <div className="space-y-4">
            {ratings.map((r) => (
              <div key={r._id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center">
                    <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                      <User className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">
                        {r.user || "Anonymous"}
                      </h4>
                      <div className="flex items-center space-x-2">
                        {renderStars(r.rating)}
                        <span className="text-sm text-gray-500">
                          • {r.date || "Recently"}
                        </span>
                      </div>
                    </div>
                  </div>
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                    {r.category}
                  </span>
                </div>
                <p className="text-gray-700 mb-3">{r.comment}</p>
                <button
                  onClick={() => handleLikeRating(r._id)}
                  className="flex items-center space-x-1 text-gray-500 hover:text-green-600"
                >
                  <ThumbsUp className="h-4 w-4" />
                  <span className="text-sm">{r.likes || 0}</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunityRatings;
