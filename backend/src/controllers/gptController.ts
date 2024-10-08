import OpenAI from "openai";
import dotenv from "dotenv";
import { Message } from "../types/types";
dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAPI_KEY,
    organization: "org-T7DDeFJUvJ8gVfr95T0Lk1tK",
    project: "proj_wHDSUETXNN3MLMtyFosKEj7n",
});

export class GPTController {
    static async *gptQuery(messages: Message[]): AsyncGenerator<string, void, unknown> {
        const stream = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: messages,
            stream: true,
        });
    
        for await (const chunk of stream) {
            yield chunk.choices[0]?.delta?.content || "";
        }
    }    
}

