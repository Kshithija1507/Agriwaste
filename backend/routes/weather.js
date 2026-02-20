import express from "express";
import axios from "axios";
import WeatherCache from "../models/WeatherCache.js";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes

router.get("/:location", async (req, res) => {
    const { location } = req.params;

    try {
        // [ ... try block execution ... ]

        // We wrap external API calls (and DB queries) in a try-catch block. 
        // This is crucial because network requests to OpenWeather API or database 
        // connections can fail unexpectedly (e.g., timeout, rate limits, invalid API keys).
        // If we don't catch these errors, an unhandled promise rejection would completely 
        // crash the Express server process, disrupting service for all users.

        // 1. Check Cache
        const cachedWeather = await WeatherCache.findOne({ location });

        if (cachedWeather) {
            const isFresh = (new Date() - new Date(cachedWeather.lastUpdated)) < CACHE_DURATION;
            if (isFresh) {
                return res.json({ ...cachedWeather.data, source: "cache" });
            }
        }

        // 2. Fetch from API
        const apiKey = process.env.OPENWEATHER_API_KEY;

        if (!apiKey) {
            // Mock response if no key
            console.warn("OPENWEATHER_API_KEY missing, returning mock data");
            const mockData = {
                name: location,
                main: { temp: 28, humidity: 60 },
                weather: [{ description: "partly cloudy", icon: "03d" }],
                wind: { speed: 5 },
                advise: "Conditions are favorable for planting.",
                source: "mock"
            };
            return res.json(mockData);
        }

        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;
        const response = await axios.get(apiUrl);
        const data = response.data;

        // Add advisory logic
        let advise = "Conditions are normal.";
        if (data.weather[0].main === "Rain") advise = "Delay watering, rain expected.";
        if (data.main.temp > 35) advise = "High heat! Increase irrigation.";

        data.advise = advise;

        // 3. Update Cache
        if (cachedWeather) {
            cachedWeather.data = data;
            cachedWeather.lastUpdated = new Date();
            await cachedWeather.save();
        } else {
            await WeatherCache.create({ location, data });
        }

        console.log(`Successfully fetched and cached weather data for ${location} from API`);
        res.json({ ...data, source: "api" });

    } catch (error) {
        // Here we gracefully catch the error and send a controlled 500 Internal Server Error 
        // response back to the client, while logging the issue for debugging.
        // The Node.js server remains alive and ready for the next request.
        console.error("Weather API Error:", error.message);
        res.status(500).json({ message: "Error fetching weather data" });
    }
});

export default router;
