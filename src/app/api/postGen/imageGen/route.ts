//here we will write code for image generation using stabledefusion ai from fireworks.ai , and return the string fro the post 
import axios from "axios";
import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const openai = new OpenAIApi(configuration);



export async function POST(req: Request ) {
    
    const { imagePrompt } = await req.json();
    console.log(imagePrompt);
    try {
        const response = await openai.createImage({
            model: "dall-e-2",
            prompt: imagePrompt,
            n: 1,
            size: "1024x1024",
          });
        console.log('called');
        
        return NextResponse.json({ imageUrl: response.data.data[0].url });
    } catch (error) {
        console.log('error');
        
        console.error(error);
        // Handle the error here
    }


}
