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
