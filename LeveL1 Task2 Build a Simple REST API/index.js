// Task Manager Application

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Sample route to get all tasks
app.get('/tasks', (req, res) => {
  res.json({ message: 'List of tasks' });
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
