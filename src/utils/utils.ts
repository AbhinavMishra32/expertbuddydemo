'use server';
import {
    GoogleGenAI,
    createUserContent,
    createPartFromUri,
} from "@google/genai";
import axios from "axios";
import fs from "fs/promises";
import path from "path";

const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY as string
console.log("GEMINI API KEY: ", GEMINI_API_KEY);
if (!GEMINI_API_KEY) {
    throw new Error("Missing NEXT_PUBLIC_GEMINI_API_KEY in environment variables")
}


const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

async function aiOnPdf(fileUrl: string, prompt: string) {
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
            model: "gemini-1.5-pro",
            contents: createUserContent([
                createPartFromUri(uploaded.uri, uploaded.mimeType),
                prompt,
            ]),
        });
        return result;
    };

    const result = await generateResponse();

    console.log(result.text);
    // Return only serializable data
    return { text: result.text };
}

export default aiOnPdf;