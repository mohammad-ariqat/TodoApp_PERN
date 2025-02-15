import express from 'express';
import pool from './db.js';
import cors from 'cors';

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes

// Main route
app.get('/', (req, res) => {
    res.send('Hello, world! The backend is working!');
});

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

// Delete a task
app.delete('/tasks/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM tasks WHERE id = $1',[id]);
        res.json('Task deleted successfully!');
    } catch (err) {
        console.error(err.message);
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
