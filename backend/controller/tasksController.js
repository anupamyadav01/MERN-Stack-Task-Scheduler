import cron from "node-cron";
import { TaskModel } from "../model/taskModel.js";
import sendEmail from "../services/sendMail.js";

export const createTask = async (req, res) => {
  const { name, schedule, email, message, expiration } = req.body;

  try {
    // Save the task in the database
    const newTask = await TaskModel.create({
      name,
      schedule,
      email,
      message,
      expiration,
    });

    // Schedule the task using node-cron
    cron.schedule(schedule, async () => {
      const task = await TaskModel.findById(newTask._id);

      // Check if the task is still valid (not expired)
      if (task && (!expiration || new Date() < new Date(expiration))) {
        // Send the email
        sendEmail(email, "Task Reminder", message);

        if (!expiration) {
          task.isCompleted = true;
          await task.save();
        }
      }
    });

    res
      .status(201)
      .json({ message: "Task scheduled successfully", task: newTask });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to schedule task" });
  }
};

export const getAllTasks = async (req, res) => {
  try {
    const tasks = await TaskModel.find(); // Fetch all tasks from the database
    res.status(200).json({
      success: true,
      data: tasks,
      message: "Tasks fetched successfully",
    });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch tasks",
    });
  }
};

export const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await TaskModel.findById(id);

    if (!task) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }

    await TaskModel.findByIdAndDelete(id); // Delete the task from the database

    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({
      success: false,
      error: "Failed to delete task",
    });
  }
};

export const updateTask = async (req, res) => {
  const { id } = req.params; // Get the task ID from the request parameters
  const updates = req.body; // Get the updates from the request body

  try {
    // Find the task by ID and update it
    const updatedTask = await TaskModel.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    // Check if the task exists
    if (!updatedTask) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res.status(200).json({
      success: true,
      data: updatedTask,
      message: "Task updated successfully",
    });
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update task",
      error: error.message,
    });
  }
};
