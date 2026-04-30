const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  priority: {
    type: String,
    enum: ["High", "Medium", "Low"],
    default: "Medium",
  },
}, { timestamps: true });

module.exports = mongoose.models.Task || mongoose.model("Task", taskSchema);
