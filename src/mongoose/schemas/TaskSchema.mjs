import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  name: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  description: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  status: {
    type: mongoose.Schema.Types.String,
    enum: ["PENDING", "COMPLETED"],
    default: "PENDING",
    // required: true,
  },
  dateCreated: {
    type: mongoose.Schema.Types.Date,
    default: Date.now,
  },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },
  order: {
    type: mongoose.Schema.Types.Number,
  },
});

export const Task = mongoose.model("Task", TaskSchema);
