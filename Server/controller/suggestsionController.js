import { generateSuggestions } from "../config/gemini.js";

export const generatedSuggestion = async (req, res) => {
  try {
    const  prompt  = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const suggestions = await generateSuggestions(prompt);
    res.status(200).json(suggestions);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
