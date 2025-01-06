import { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import axios from 'axios';

const App = () => {
    const [tasks, setTasks] = useState([]);

    // Fetch tasks from the backend
    const fetchTasks = async () => {
        try {
            const res = await axios.get('http://localhost:3000/tasks');
            setTasks(res.data);
        } catch (err) {
            console.error('Error fetching tasks:', err);
        }
    };

    // Fetch tasks when the app loads
    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <div>
            <h1>To-Do App</h1>
            {/* Pass the actual fetchTasks function to TaskForm */}
            <TaskForm fetchTasks={fetchTasks} />
            {/* Pass tasks and setTasks to TaskList */}
            <TaskList tasks={tasks} setTasks={setTasks} />
        </div>
    );
};

export default App;
