import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import sequelize from "./config/sequelize";
import gptRouter from "./routes/gpt";
import authRouter from "./routes/auth"

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET || "",
  resave: false,
  saveUninitialized: true,
}));

// Middleware
app.use(cors());
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/auth", authRouter);
app.use('/gpt', gptRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Backend API");
});

// Test the database connection and sync models
sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log(`Server is running on port ${port}.`);
  });
}).catch(error => console.log("Database connection failed:", error));