import { Router } from "express";
import { GPTController } from "../controllers/gptController";
import { Message } from "../types/types";

const router = Router();

router.post("/query", async (req, res) => {
    try {
        const data: Message[] = req.body;
        console.log("Data", data);

        if (!data) {
            res.status(400).send("Need to include prompt in request.");
        }
        
        const generator = GPTController.gptQuery(data);
        let result = '';

        for await (const chunk of generator) {
            result += chunk;
        }

        res.send(result);
    } catch (err) {
        console.log(err);
        res.send("An error occurred");
    }
});

export default router