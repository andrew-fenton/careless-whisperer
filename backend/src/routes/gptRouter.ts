import { Router } from "express";

export const gptRouter = Router();

gptRouter.get("/query", (req, res) => {
    res.send("Data");
});