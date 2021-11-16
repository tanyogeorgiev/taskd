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
    });

    return (
        <>
            {tasks.map((task) => (
                <Task key={task.id} task={task} />
            ))}
        </>
    );
};

export default Tasks;
