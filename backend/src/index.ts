import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import session from "express-session";
import sequelize from "./config/sequelize";
import gptRouter from "./routes/gpt";
import userRouter from "./routes/user";

// Import models
import "./models/user";

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

// Routes
app.use("/gpt", gptRouter);
app.use("/users", userRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Backend API");
});

// Test the database connection and sync models
const start = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');

    await sequelize.sync({ force: false });
    console.log("Database and tables synced.");

    app.listen(3000, () => {
      console.log(`Server is running on port ${port}.`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

start();