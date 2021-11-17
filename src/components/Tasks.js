import { useEffect } from 'react';
import getTask from '../context/task/actions/getTasks';
import { useTaskState } from '../context/task/TaskProvider';
import { useUserState } from '../context/user/UserProvider';

import Task from './Task';

const Tasks = () => {
    const { tasks, dispatch } = useTaskState();
    const { user } = useUserState();

    useEffect(() => {
        const getTasks = async () => {
            if (user.data.id && tasks.length === 0) {
                getTask(user.data.id)(dispatch);
            }
        };
        getTasks();
    }, [user]);

    return (
        <div className="content">
            {tasks.map((task) => (
                <Task key={task.id} task={task} />
            ))}
        </div>
    );
};

export default Tasks;
