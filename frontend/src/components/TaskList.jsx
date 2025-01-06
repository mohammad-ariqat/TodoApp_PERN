import { useEffect } from 'react';
import axios from 'axios';

const TaskList = ({ tasks, setTasks }) => {
    const fetchTasks = async () => {
        try {
            const res = await axios.get('http://localhost:3000/tasks');
            setTasks(res.data);
        } catch (err) {
            console.error('Error fetching tasks:', err);
        }
    };

    const deleteTask = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/tasks/${id}`);
            fetchTasks();
        } catch (err) {
            console.error('Error deleting task:', err);
        }
    };

    const toggleCompletion = async (task) => {
        try {
            await axios.put(`http://localhost:3000/tasks/${task.id}`, {
                task_description: task.task_description,
                is_completed: !task.is_completed, // Toggle the current status
            });
            fetchTasks(); // Refresh the task list
        } catch (err) {
            console.error('Error toggling task completion:', err);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <ul>
            {tasks.map((task) => (
                <li key={task.id} style={{ textDecoration: task.is_completed ? 'line-through' : 'none' }}>
                    <input
                        type="checkbox"
                        checked={task.is_completed}
                        onChange={() => toggleCompletion(task)}
                    />
                    {task.task_description}
                    <button onClick={() => deleteTask(task.id)}>Delete</button>
                </li>
            ))}
        </ul>
    );
};

export default TaskList;
