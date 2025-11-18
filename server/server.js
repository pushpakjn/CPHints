import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import Redis from "ioredis";
import morgan from "morgan";

import userRoutes from "./src/users/routes.js";
import hintRoutes from "./src/hints/routes.js";
import reviewRoutes from "./src/review/routes.js";
import questionRoutes from "./src/question/routes.js";
import profileRoutes from "./src/profile/routes.js";
import leaderboardRoutes from "./src/leaderboard/routes.js";

const app = express();
app.use(
  morgan(":method :url :status :response-time ms - :res[content-length]")
);
const __filename = fileURLToPath(import.meta.url);

dotenv.config();
const __dirname = path.dirname(__filename);
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
// app.use("/api", userRouter);
app.use("/api/users", userRoutes);
app.use("/api/hints", hintRoutes);
app.use("/api/review", reviewRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/leaderboard", leaderboardRoutes);

const PORT = process.env.PORT || 5001;
var redisClient;
const startServer = async () => {
  const redisConfig = {
    host: process.env.REDIS_HOST,
    port: 11556,
    password: process.env.REDIS_PASSWORD, 
  };
  redisClient = new Redis(redisConfig);
  app.listen(PORT, () => {
    console.log(`serving on port ${PORT}`);
  });
};
startServer();
export { redisClient };
