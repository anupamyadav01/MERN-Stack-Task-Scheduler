import express from "express";
import {
  createTask,
  deleteTask,
  getAllTasks,
  searchTasks,
  updateTask,
} from "../controller/tasksController.js";

export const TaskRouter = express.Router();

TaskRouter.post("/createTask", createTask);

TaskRouter.get("/getAllTasks", getAllTasks);

TaskRouter.delete("/deleteTask/:id", deleteTask);

TaskRouter.put("/updateTask/:id", updateTask);

TaskRouter.get("/searchTasks", searchTasks);
