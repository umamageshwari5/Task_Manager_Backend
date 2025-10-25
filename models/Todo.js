const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    description: { type: String },
    completed: { type: Boolean, default: false },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Low",
    },
    dueDate: { type: Date },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Todo", TodoSchema);
