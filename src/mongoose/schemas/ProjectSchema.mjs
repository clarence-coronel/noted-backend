import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
  name: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  createdOn: {
    type: mongoose.Schema.Types.Date,
    default: Date.now,
  },
  listType: {
    type: String,
    enum: ["UL", "OL"],
    required: true,
  },
});

export const Project = mongoose.model("Project", ProjectSchema);