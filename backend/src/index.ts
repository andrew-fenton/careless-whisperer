import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { gptRouter } from "./routes/gptRouter";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Backend API");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

app.use('/gpt', gptRouter);