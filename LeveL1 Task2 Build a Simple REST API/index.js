// Task Manager Application

const express = require('express');
const bodyParser = require('body-parser');
const { body, validationResult } = require("express-validator");
const util = require("util");

const app = express();
const PORT = process.env.PORT || 3000;

const conn = require("../DB/DBConnection");

app.use(bodyParser.json());

// Sample route to get all tasks
app.get('/tasks', 
    body('title').isString(),
    body('description')
        .isLength({ min: 8, max: 12 })
        .withMessage("password should be between (8-12) character"),
    body('status').isIn(['pending', 'in-progress', 'completed']),
    async (req, res) => {
        try {
             // 1- VALIDATION REQUEST [manual, express validation]
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
                }
            const query = util.promisify(conn.query).bind(conn);
            
                const tasks = await query('SELECT * FROM tasks');
                res.json({ message: 'List of tasks', tasks: tasks.rows });
            
                console.error('Error fetching tasks', err);
                return res.status(500).json({ error: 'Internal server error' });
        } catch (err) {
            console.error('Error fetching tasks', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
});

// Sample route to create a new task
app.post('/tasks', (req, res) => {
  const taskTitle = req.body.title;
  const taskDescription = req.body.description;
  const taskStatus = req.body.status || 'pending';
  if (!taskTitle || !taskDescription) {
    return res.status(400).json({ error: 'Title and description are required' });
  }
  const newTask = { title: taskTitle, description: taskDescription, status: taskStatus };
  res.status(201).json({ message: 'Task created', task: newTask });
});

// Sample route to update a task
app.put('/tasks/:id', (req, res) => {
  const taskId = req.params.id;
  const updatedTask = req.body;
  res.json({ message: `Task ${taskId} updated`, task: updatedTask });
});

// Sample route to delete a task
app.delete('/tasks/:id', (req, res) => {
  const taskId = req.params.id;
  res.json({ message: `Task ${taskId} deleted` });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
