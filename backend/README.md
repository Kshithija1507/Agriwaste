# Agriwaste Backend

This directory contains the Express.js server for the Agriwaste application.

## Core Technologies
- **Express.js**: Web framework for building API routes.
- **Mongoose**: MongoDB object modeling tool.
- **Axios**: HTTP client for fetching data from external APIs (like OpenWeather API).
- **Dotenv**: Environment variable management.
- **Nodemon**: Development utility to auto-restart the server on file changes.

## Scripts
- `npm start`: Starts the server using nodemon.
- `npm run dev`: Starts the server in development mode using nodemon.

## Environment Variables
Create a `.env` file in the `backend` directory with the required variables, for example:
- `PORT=5000`
- `MONGO_URI=mongodb://localhost:27017/agriwaste`
- `OPENWEATHER_API_KEY=your_openweather_api_key_here`

## Important Routes
- **Weather API (`/api/weather/:location`)**: Fetches current weather for a specific location using the OpenWeather API, caches the results to avoid rate limiting, and returns an agricultural advisory.
