import Groq from "groq-sdk";
import dotenv from "dotenv";

dotenv.config();

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export const getPlantRecommendations = async (data) => {
  const { location, soilType, sunlight, wasteType } = data;

  const prompt = `
    I have the following agricultural conditions:
    - Location: ${location}
    - Soil Type: ${soilType}
    - Sunlight: ${sunlight}
    - Available Agri-Waste: ${wasteType}

    Based on this, suggest top 5 plants/crops that thrive on this agri-waste compost.
    Return the response in strictly JSON format with the following structure:
    {
      "recommendations": [
        {
          "plantName": "Plant Name",
          "growthTime": "e.g., 3-4 months",
          "yield": "Expected yield per acre/pot",
          "wasteUsageRatio": "How much waste compost to use (e.g., 1:3 ratio)",
          "confidence": 0.95 (number between 0-1)
        }
      ]
    }
    Do not add any markdown formatting or extra text. Just the JSON.
  `;

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are an agricultural expert AI. Output strict JSON only.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.5,
      max_tokens: 1024,
      response_format: { type: "json_object" },
    });

    const result = chatCompletion.choices[0]?.message?.content;
    return JSON.parse(result);
  } catch (error) {
    console.error("Groq AI Error:", error);
    throw new Error("Failed to fetch recommendations from AI");
  }
};

export const getAiSuggestions = async (wasteType) => {
  const prompt = `
    Suggest 5 innovative ways to reuse, upcycle, or process the following agricultural waste: "${wasteType}".
    Focus on creating valuable products (e.g., for home, industry, or energy).

    Return the response in strictly JSON format with the following structure:
    {
      "suggestions": [
        {
          "id": "1", // unique string
          "waste": "${wasteType}",
          "products": ["Product 1", "Product 2"],
          "description": "Brief explanation of the process or utility.",
          "difficulty": "Easy", // or Medium, Hard
          "impact": "High - Reduces X amount of waste/CO2"
        }
      ]
    }
    Ensure the JSON is valid and do not include markdown blocks.
    `;

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are an agricultural waste management expert. Output strict JSON only.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.7,
      max_tokens: 1024,
      response_format: { type: "json_object" },
    });

    const result = chatCompletion.choices[0]?.message?.content;
    return JSON.parse(result);
  } catch (error) {
    console.error("Groq AI Suggestion Error:", error);
    throw new Error("Failed to fetch AI suggestions");
  }
};

export const getChatbotResponse = async (messagesHistory, languageCode) => {
  try {
    // Determine language name from code
    const langMap = {
      'en': 'English',
      'hi': 'Hindi (हिंदी)',
      'te': 'Telugu (తెలుగు)',
      'ta': 'Tamil (தமிழ்)'
    };
    const targetLanguage = langMap[languageCode] || 'English';

    // Create a system message setting the chatbot identity and target language explicitly
    const systemMessage = {
      role: "system",
      content: `You are AgriBot, a helpful, precise, and friendly virtual assistant for the Agriwaste platform. You answer questions related to agriculture, farming, crops, and agricultural waste management. You MUST answer the user strictly in ${targetLanguage}. Keep your answers relatively short and conversational. Do not output JSON, speak in normal text.`
    };

    const chatCompletion = await groq.chat.completions.create({
      messages: [systemMessage, ...messagesHistory],
      model: "llama-3.3-70b-versatile",
      temperature: 0.7,
      max_tokens: 500,
    });

    return chatCompletion.choices[0]?.message?.content || "I'm sorry, I couldn't generate a response.";
  } catch (error) {
    console.error("Groq AI Chatbot Error:", error);
    throw new Error("Failed to fetch chatbot response");
  }
};
