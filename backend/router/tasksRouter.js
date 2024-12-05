import express from "express";
import {
  createTask,
  deleteTask,
  getAllTasks,
  updateTask,
} from "../controller/tasksController.js";

export const TaskRouter = express.Router();

TaskRouter.post("/createTask", createTask);

TaskRouter.get("/getAllTasks", getAllTasks);

TaskRouter.delete("/deleteTask/:id", deleteTask);

TaskRouter.put("/updateTask/:id", updateTask);
