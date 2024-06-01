import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: {
    type: mongoose.Schema.Types.String,
    required: true,
    unique: true,
  },
  registeredOn: {
    type: mongoose.Schema.Types.Date,
    default: Date.now,
  },
  displayName: mongoose.Schema.Types.String,
  password: { type: mongoose.Schema.Types.String, required: true },
  projectIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    },
  ],
});

export const User = mongoose.model("User", UserSchema);
