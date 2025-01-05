const express = require('express');
const pool = require('./db');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes

// Create a task
app.post('/tasks', async (req, res) => {
    try {
        const { task_description } = req.body;
        const newTask = await pool.query(
            'INSERT INTO tasks (task_description) VALUES ($1) RETURNING *',
            [task_description]
        );
        res.json(newTask.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

// Get all tasks
app.get('/tasks', async (req, res) => {
    try {
        const allTasks = await pool.query('SELECT * FROM tasks');
        res.json(allTasks.rows);
    } catch (err) {
        console.error(err.message);
    }
});

// Update a task
app.put('/tasks/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { task_description, is_completed } = req.body;
        await pool.query(
            'UPDATE tasks SET task_description = $1, is_completed = $2 WHERE id = $3',
            [task_description, is_completed, id]
        );
        res.json('Task updated successfully!');
    } catch (err) {
        console.error(err.message);
    }
});
