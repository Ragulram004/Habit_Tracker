import axios from "axios";

export const generateSuggestions = async (inputData) => {
  const prompt = `
The user has logged the following health data:

${inputData}

Based on this, generate the following personalized tips:
- Sleep Improvement
- Diet Tip
- Workout Suggestion (based on their age and fitness level)

Respond strictly in this JSON format:
{
  "Sleep Improvement": "tip...",
  "Diet Tip": "tip...",
  "Workout Suggestion": "tip..."
}
`;

  const apiKey = process.env.GEMINI_API_KEY;
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyBRaXdyOUCxSwkLOQxPaHvvQ4xDi0_Jb8o`;

  const body = {
    contents: [
      {
        parts: [{ text: prompt }]
      }
    ]
  };

  try {
    const response = await axios.post(url, body);
    const text = response.data.candidates?.[0]?.content?.parts?.[0]?.text;

    // Safely extract JSON from text response
    const jsonStart = text.indexOf("{");
    const jsonEnd = text.lastIndexOf("}") + 1;
    const jsonString = text.slice(jsonStart, jsonEnd);

    return JSON.parse(jsonString);

  } catch (error) {
    console.error("Gemini HTTP error:", error.response?.data || error.message);
    throw new Error("Failed to generate suggestions");
  }
};
