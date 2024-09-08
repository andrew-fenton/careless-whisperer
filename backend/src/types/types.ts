interface MessageInterface {
    role: "user" | "assistant";
    content: string;
}

export type Message = MessageInterface;