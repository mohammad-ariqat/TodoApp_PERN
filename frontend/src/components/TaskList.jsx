import { useEffect } from 'react';
import axios from 'axios';

const TaskList = ({ tasks, setTasks }) => {
    const fetchTasks = async () => {
        const res = await axios.get('http://localhost:3000/tasks');
        setTasks(res.data);
    };

    const deleteTask = async (id) => {
        await axios.delete(`http://localhost:3000/tasks/${id}`);
        fetchTasks();
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <ul>
            {tasks.map((task) => (
                <li key={task.id}>
                    {task.task_description}{' '}
                    <button onClick={() => deleteTask(task.id)}>Delete</button>
                </li>
            ))}
        </ul>
    );
};

export default TaskList;
