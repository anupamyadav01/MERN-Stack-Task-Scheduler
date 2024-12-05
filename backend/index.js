import express from "express";
import { TaskRouter } from "./router/tasksRouter.js";
import cors from "cors";
import dotenv from "dotenv";
import { connectToMongoDB } from "./services/connectToMongoDB.js";

const app = express();

dotenv.config();
const PORT = process.env.PORT || 10000;

app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://mern-stack-task-scheduler.vercel.app",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
connectToMongoDB();
app.use(express.json());

app.use("/api/tasks", TaskRouter);

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
