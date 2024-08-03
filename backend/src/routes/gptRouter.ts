import { Router } from "express";
import { GPTController } from "../controllers/GPTController";

export const gptRouter = Router();

gptRouter.get("/query", async (req, res) => {
    const generator = GPTController.gptQuery("Hello");
    let result = '';

    for await (const chunk of generator) {
        result += chunk;
    }

    res.send(result);
});