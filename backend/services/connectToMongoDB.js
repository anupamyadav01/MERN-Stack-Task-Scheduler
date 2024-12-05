import mongoose from "mongoose";

export const connectToMongoDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    mongoose.set("strictPopulate", false);
    await mongoose.connect(`${process.env.MONGODB_URI}/Task-Scheduler`);
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
};
