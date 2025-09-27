// Task Manager Application

const express = require('express');
const bodyParser = require('body-parser');
const { body, validationResult } = require("express-validator");
const util = require("util");

const app = express();
const PORT = process.env.PORT || 3000;

const conn = require("./DB Conn");

app.use(bodyParser.json());

// Sample route to get all tasks
app.get('/tasks',
  async (req, res) => {
      try {
          const tasks = await conn.query('SELECT * FROM tasks');
          console.log(tasks.rows);
          res.json({ message: 'List of tasks', tasks: tasks.rows });
      } catch (err) {
          console.error('Error fetching tasks', err);
          return res.status(500).json({ error: 'Internal server error' });
      }
    }
);

// Sample route to create a new task
app.post('/task', 
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('description').isLength({ min: 5 }).withMessage('Description must be at least 5 characters long'),
    body('status').optional().isIn(['pending', 'in-progress', 'completed']).withMessage('Invalid status value')
  ],
  async(req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { title, description, status } = req.body;
      const newTask = await conn.query('INSERT INTO tasks (title, description, status) VALUES ($1, $2, $3) RETURNING *', [title, description, status || 'pending']);
      console.log(newTask.rows);
      res.status(200).json({ message: 'Task created', task: newTask.rows });
    } catch (err) {
      console.error('Error creating task', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
});


// Sample route to update a task
app.put(
  "/tasks/:id",
  [
    body("title").optional().notEmpty().withMessage("Title cannot be empty"),
    body("description")
      .optional()
      .isLength({ min: 5 })
      .withMessage("Description must be at least 5 characters long"),
    body("status")
      .optional()
      .isIn(["pending", "in-progress", "completed"])
      .withMessage("Invalid status value"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { id } = req.params;
      const { title, description, status } = req.body;

      const result = await conn.query(
        `UPDATE tasks 
         SET title = COALESCE($1, title), 
             description = COALESCE($2, description), 
             status = COALESCE($3, status) 
         WHERE id = $4 RETURNING *`,
        [title || null, description || null, status || null, id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ message: "Task not found" });
      }

      res.json({ message: "Task updated", task: result.rows[0] });
    } catch (err) {
      console.error("Error updating task", err);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
);


// Sample route to delete a task
app.delete("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await conn.query(
      "DELETE FROM tasks WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task deleted", task: result.rows[0] });
  } catch (err) {
    console.error("Error deleting task", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Get Specific Task
app.get("/tasks/:title", async (req, res) => {
  try {
    const { title } = req.params;

    const result = await conn.query("SELECT * FROM tasks WHERE title = $1", [title]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task fetched", task: result.rows[0] });
  } catch (err) {
    console.error("Error fetching task by ID", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
