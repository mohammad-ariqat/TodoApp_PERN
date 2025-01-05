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
