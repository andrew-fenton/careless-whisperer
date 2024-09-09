/**
 * ChatQueue handles all functionality relating to retaining context within chats. Prompts to and responses from the LLM are enqueued
 * and dequeued once queue overflows.
 * 
 * 
 */

const CHARACTERS_PER_TOKEN = 4; // each token ~ 3-4 chars

interface Message {
    role: 'user' | 'assistant';
    content: string;
    tokenCount: number;
}

export class ChatQueue {
    private queue: Message[] = [];
    private maxTokenCount: number;
    private currentTokenCount: number;

    constructor(maxTokenCount: number) {
        this.maxTokenCount = maxTokenCount;
        this.currentTokenCount = 0;
    }

    private getTokenCount(str: string): number {
        // Approximating token count with characters due to CSP issues with tiktoken
        return Math.ceil(str.length / CHARACTERS_PER_TOKEN);
    }

    private enqueue(message: Message) {
        this.queue.push(message);
    }

    private dequeue(): Message | null {
        const dequeuedMessage = this.queue.shift();

        if (dequeuedMessage) {
            return dequeuedMessage;
        }
        
        return null;
    }

    public enqueueMessage(message: string, role: 'user' | 'assistant') {
        const messageTokenCount = this.getTokenCount(message);
        
        // Remove messages until enough space is made to enqueue new message
        while (this.currentTokenCount + messageTokenCount > this.maxTokenCount) {
            const oldestMessage = this.dequeue();

            if (oldestMessage) {
                this.currentTokenCount -= oldestMessage.tokenCount;
            } else {
                break;
            }
        }

        // Enqueue new message
        const newMessage: Message = {
            role: role,
            content: message,
            tokenCount: messageTokenCount,
        };
        this.enqueue(newMessage);
        this.currentTokenCount += messageTokenCount;
    }

    public getHistory() {
        return this.queue.map((message: Message) => ({
            role: message.role,
            content: message.content,
        }));
    }
}