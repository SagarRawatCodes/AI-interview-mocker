/*import {GoogleGenAI} from '@google/genai';
const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

const ai = new GoogleGenAI({apiKey: GEMINI_API_KEY});

async function main() {
  const response = await ai.models.generateContent({
    model: 'gemini-2.0-flash-001',
    contents: 'Why is the sky blue?',
  });
  console.log(response.text);
}

main();*/
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

export async function generateInterviewQuestions(promptData) {
  try {
    // Get the Gemini Flash model
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash-latest",
      generationConfig: {
        responseMimeType: "application/json"
      }
    });

    // Structure the prompt for better results
    const prompt = `Generate exactly 5 interview questions with answers in JSON format for:
    Job Position: ${promptData.jobPosition}
    Technologies: ${promptData.jobDescription}
    Experience: ${promptData.jobExperience} years
    
    Return ONLY valid JSON in this format:
    [
      {
        "question": "Question text",
        "answer": "Answer text"
      }
    ]`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Clean and parse the response
    let jsonString = text;
    // Remove markdown code blocks if present
    jsonString = jsonString.replace(/```json|```/g, '').trim();
    
    return JSON.parse(jsonString);
    
    
  } catch (error) {
    console.error("Error generating questions:", error);
    throw error;
  }
}
