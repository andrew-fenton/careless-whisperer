import axios from "axios";
import { Message } from "../types/types";

class ChatService {
    async sendMessages(messages: Message[]): Promise<string> {
        try {
            const response = await axios.post(
                "http://localhost:3000/gpt/query",
                messages,
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );
            return response.data;
        } catch (e) {
            console.error(e);
            throw e;
        }    
    }
}

export default new ChatService();