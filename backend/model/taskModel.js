import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  name: { type: String, required: true },
  schedule: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  expiration: { type: Date, default: null },
  isCompleted: { type: Boolean, default: false },
});

export const TaskModel = mongoose.model("Task", taskSchema);
