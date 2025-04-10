'use server';
import {
    GoogleGenAI,
    createUserContent,
    createPartFromUri,
} from "@google/genai";
import { SchemaType } from "@google/generative-ai";
import axios from "axios";
import fs from "fs/promises";
import path from "path";

const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY as string
if (!GEMINI_API_KEY) {
    throw new Error("Missing NEXT_PUBLIC_GEMINI_API_KEY in environment variables")
}

type AIResponse = {
    textContent: string;
    tags: string[];
    category: string;
    subject: string;
    description: string;
    language: string;
};


const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

async function aiOnPdf(fileUrl: string, prompt: string) {

    const schema = {
        "type": "object",
        "properties": {
          "textContent": {
            "type": "string"
          },
          "tags": {
            "type": "array",
            "items": {
              "type": "string"
            }
          },
            "subject": {
                "type": "string"
            },
          "category": {
            "type": "string"
          },
          "language": {
            "type": "string"
          },
          "description": {
            "type": "string"
          }
        }
      }

    // file download as we have it in url
    const response = await axios.get(fileUrl, { responseType: "arraybuffer" });
    const filePath = path.join(process.cwd(), "temp.pdf");
    await fs.writeFile(filePath, response.data);

    const uploaded = await ai.files.upload({
        file: filePath,
        config: { mimeType: "application/pdf" },
    });

    const generateResponse = async () => {
        const result = await ai.models.generateContent({
            model: "gemini-2.0-flash-exp",
            contents: createUserContent([
                createPartFromUri(uploaded.uri, uploaded.mimeType),
                prompt,
            ]),
            config: {
                responseMimeType: 'application/json',
                responseSchema: schema,
            }
        });
        return result;
    };

    const result = await generateResponse();

    if (!result.text) {
        throw new Error("Something went wrong while getting AI response");
    }

    try {
        const parsedResponse = JSON.parse(result.text) as AIResponse;
        console.log("JSON RESULT: ", parsedResponse);
        return parsedResponse;
    } catch (error) {
        console.error("Failed to parse AI response:", error);
        throw new Error("Failed to parse AI response");
    }
}

export default aiOnPdf;