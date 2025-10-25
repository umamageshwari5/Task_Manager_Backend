const express = require("express");
const router = express.Router();
const Todo = require("../models/Todo");
const auth = require("../middleware/auth");

router.get("/", auth, async (req, res) => {
  const todos = await Todo.find({ user: req.user.id });
  res.json(todos);
});

router.post("/", auth, async (req, res) => {
  const { title, description, completed, priority, dueDate } = req.body;
  const newTodo = new Todo({
    user: req.user.id,
    title,
    description,
    completed: completed || false,
    priority: priority || "Low",
    dueDate,
  });
  const todo = await newTodo.save();
  res.json(todo);
});

router.put("/:id", auth, async (req, res) => {
  const { title, description, completed, priority, dueDate } = req.body;
  const todo = await Todo.findOneAndUpdate(
    { _id: req.params.id, user: req.user.id },
    { title, description, completed, priority, dueDate },
    { new: true }
  );
  res.json(todo);
});

router.delete("/:id", auth, async (req, res) => {
  await Todo.findOneAndDelete({ _id: req.params.id, user: req.user.id });
  res.json({ msg: "Todo deleted" });
});

module.exports = router;
