import express from "express";
import { createTask } from "../controller/tasksController.js";

export const TaskRouter = express.Router();

TaskRouter.post("/createTask", createTask);
