import { Router } from "express";
import { GPTController } from "../controllers/gptController";

const router = Router();

router.post("/query", async (req, res) => {
    try {
        const data = req.body;

        if (!data.prompt) {
            res.status(400).send("Need to include prompt in request.");
        }
        
        const generator = GPTController.gptQuery(data.prompt);
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