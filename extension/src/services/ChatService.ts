import axios from "axios";

class ChatService {
    async sendPrompt(prompt: string): Promise<string> {
        try {
            const response = await axios.post("http://localhost:3000/gpt/query", { prompt: prompt });
            return response.data;
        } catch (e) {
            console.error(e);
            throw e;
        }    
    }
}

export default new ChatService();