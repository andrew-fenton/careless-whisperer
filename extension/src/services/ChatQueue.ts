/**
 * ChatQueue handles all functionality relating to retaining context within chats. Prompts to and responses from the LLM are enqueued
 * and dequeued once queue overflows.
 * 
 * 
 */

import { encoding_for_model } from 'tiktoken';

const enc = encoding_for_model("gpt-4");

interface Message {
    role: 'user' | 'assistant';
    content: string;
    tokenCount: number;
}

class ChatQueue {
    private queue: Message[] = [];
    private maxTokenCount: number;
    private currentTokenCount: number;

    constructor(maxTokenCount: number) {
        this.maxTokenCount = maxTokenCount;
        this.currentTokenCount = 0;
    }

    private getTokenCount(str: string): number {
        return enc.encode(str).length;
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

    public getHistory(): Message[] {
        return this.queue;
    }
}