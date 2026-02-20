import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";

// Routes
import authRoutes from "./routes/authRoutes.js";
import ratingsRoutes from "./routes/ratings.js";
import suggestionsRoutes from "./routes/suggestions.js";
import wasteToProductRoutes from "./routes/wasteToProductRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import recommendationRoutes from "./routes/recommendations.js";
import wateringRoutes from "./routes/watering.js";
import marketplaceRoutes from "./routes/marketplace.js";
import weatherRoutes from "./routes/weather.js";
import diseaseRoutes from "./routes/disease.js";


dotenv.config();
const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// ✅ API Routes
app.use("/api/auth", authRoutes);
app.use("/api/ratings", ratingsRoutes);
app.use("/api/suggestions", suggestionsRoutes);
app.use("/api/waste", wasteToProductRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/recommendations", recommendationRoutes);
app.use("/api/watering", wateringRoutes);
app.use("/api/marketplace", marketplaceRoutes);
app.use("/api/weather", weatherRoutes);
app.use("/api/disease", diseaseRoutes);

// ✅ Health check route
app.get("/", (req, res) => {
  res.json({ message: "API is running 🚀" });
});

// ✅ Start server after DB connection
const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () =>
      console.log(`🚀 Server running on http://localhost:${PORT}`)
    );
  })
  .catch((err) => {
    console.error("❌ Failed to connect to MongoDB:", err.message);
    process.exit(1);
  });
