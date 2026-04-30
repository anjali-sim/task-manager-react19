require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

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

// GET all tasks
app.get("/tasks", async (req, res) => {
  const tasks = await Task.find().sort({ createdAt: -1 });
  res.json(tasks);
});

// POST a new task
app.post("/tasks", async (req, res) => {
  const { title, dueDate } = req.body;
  const newTask = await Task.create({ title, dueDate: dueDate || null });
  res.status(201).json(newTask);
});

// PUT (update) a task
app.put("/tasks/:id", async (req, res) => {
  const { title } = req.body;
  const updatedTask = await Task.findByIdAndUpdate(
    req.params.id,
    { title },
    { new: true }
  );
  if (!updatedTask) return res.status(404).json({ message: "Not found" });
  res.json(updatedTask);
});

// DELETE a task
app.delete("/tasks/:id", async (req, res) => {
  const deleted = await Task.findByIdAndDelete(req.params.id);
  if (!deleted) return res.status(404).json({ message: "Not found" });
  res.status(204).end();
});

// GET a single task by ID
app.get("/tasks/:id", async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ message: "Not found" });
  res.json(task);
});

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
