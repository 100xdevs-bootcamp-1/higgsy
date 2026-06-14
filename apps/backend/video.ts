import { GoogleGenAI, VideoGenerationReferenceType } from "@google/genai";
import axios from "axios"

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_API_KEY
});
  

export async function generateVideo(prompt: string, imageUrls: string[], outputPath: string) {
    // const imageBuffers = await Promise.all(imageUrls.map(async imageUrl => {
    //     console.log(imageUrl)
    //     const base64Image = await axios
    //         .get(imageUrl, {
    //             responseType: 'arraybuffer'
    //         })
    //         .then(response => Buffer.from(response.data, 'binary').toString('base64'))

    //     return {
    //         image: { imageBytes: base64Image },
    //         referenceType: VideoGenerationReferenceType.ASSET
    //     }
    // }))

    // console.log("hi there");

    
    const headers = {
    Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
    'Content-Type': 'application/json',
    };
    // Step 1: Submit the generation request
    const response = await fetch('https://openrouter.ai/api/v1/videos', {
        method: 'POST',
        headers,
        body: JSON.stringify({
            model: 'google/veo-3.1',
            prompt: prompt,
            duration: 8,
            generate_audio: false,
            input_references: imageUrls.map(imageurl => ({
                "type": "image_url",
                "image_url": {
                  "url": imageurl
                }
            }))
        }),
    });
    const result = await response.json();
    console.log(result)
    const jobId = result.id;
    const pollingUrl = result.polling_url;
    console.log(`Job submitted: ${jobId}`);
    console.log(`Status: ${result.status}`);
    //TODO add logic to keep polling!
}