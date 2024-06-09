import mongoose, { mongo } from "mongoose";

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
  ownedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

export const Project = mongoose.model("Project", ProjectSchema);
