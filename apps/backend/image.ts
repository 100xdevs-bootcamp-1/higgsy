import { GoogleGenAI } from "@google/genai";
import axios from "axios";
import fs from "fs";

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_API_KEY
});
  
export async function createImage(userPrompt: string, imageUrl: string, outputFilePath: string) {
    const base64Image = await axios
        .get(imageUrl, {
        responseType: 'arraybuffer'
        })
        .then(response => Buffer.from(response.data, 'binary').toString('base64'))
  
  const prompt = [
      { text: userPrompt },
      {
        inlineData: {
          mimeType: "image/png",
          data: base64Image,
        },
      },
  ];

    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-image",
      contents: prompt,
    });
    const parts = response.candidates?.[0]?.content?.parts!;

    for (const part of parts) {
      if (part.text) {
        console.log(part.text);
      } else if (part.inlineData) {
        const imageData = part.inlineData.data;
        const buffer = Buffer.from(imageData, "base64");
        fs.writeFileSync(outputFilePath, buffer);
      }
    }
}