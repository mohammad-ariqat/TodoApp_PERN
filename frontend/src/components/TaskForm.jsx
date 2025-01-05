import { useState } from 'react';
import axios from 'axios';

const TaskForm = ({ fetchTasks }) => {
    const [taskDescription, setTaskDescription] = useState('');

    const addTask = async (e) => {
        e.preventDefault();
        if (taskDescription) {
            await axios.post('http://localhost:3000/tasks', {
                task_description: taskDescription,
            });
            setTaskDescription('');
            fetchTasks();
        }
    };

    return (
        <form onSubmit={addTask}>
            <input
                type="text"
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
                placeholder="Enter task"
            />
            
            <button type="submit">Add Task</button>
        </form>
    );
};

export default TaskForm;
