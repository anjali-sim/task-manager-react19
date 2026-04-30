require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const connectDB = require("./lib/db");
const Task = require("./models/Task");

const app = express();
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());

app.use(async (req, res, next) => {
  await connectDB();
  next();
});

const VALID_PRIORITIES = ["High", "Medium", "Low"];

function isValidObjectId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

// GET all tasks
app.get("/tasks", async (req, res) => {
  const tasks = await Task.find().sort({ createdAt: -1 });
  res.json(tasks);
});

// POST a new task
app.post("/tasks", async (req, res) => {
  const { title, priority } = req.body;
  const sanitizedPriority =
    priority && VALID_PRIORITIES.includes(priority) ? priority : "Medium";
  const newTask = await Task.create({ title, priority: sanitizedPriority });
  res.status(201).json(newTask);
});

// PUT (update) a task
app.put("/tasks/:id", async (req, res) => {
  if (!isValidObjectId(req.params.id)) {
    return res.status(400).json({ message: "Invalid task ID" });
  }
  const taskId = new mongoose.Types.ObjectId(req.params.id);
  const { title, completed, priority } = req.body;
  const sanitizedPriority =
    priority && VALID_PRIORITIES.includes(priority) ? priority : undefined;
  const updatedTask = await Task.findByIdAndUpdate(
    taskId,
    { title, completed, ...(sanitizedPriority && { priority: sanitizedPriority }) },
    { new: true }
  );
  if (!updatedTask) return res.status(404).json({ message: "Not found" });
  res.json(updatedTask);
});

// DELETE a task
app.delete("/tasks/:id", async (req, res) => {
  if (!isValidObjectId(req.params.id)) {
    return res.status(400).json({ message: "Invalid task ID" });
  }
  const taskId = new mongoose.Types.ObjectId(req.params.id);
  const deleted = await Task.findByIdAndDelete(taskId);
  if (!deleted) return res.status(404).json({ message: "Not found" });
  res.status(204).end();
});

// GET a single task by ID
app.get("/tasks/:id", async (req, res) => {
  if (!isValidObjectId(req.params.id)) {
    return res.status(400).json({ message: "Invalid task ID" });
  }
  const taskId = new mongoose.Types.ObjectId(req.params.id);
  const task = await Task.findById(taskId);
  if (!task) return res.status(404).json({ message: "Not found" });
  res.json(task);
});

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
