import { useEffect } from 'react';
import getTask from '../context/task/actions/getTasks';
import { useTaskState } from '../context/task/TaskProvider';
import { useUserState } from '../context/user/UserProvider';
import useLocalStorage from '../hooks/use-local-storage';

import Task from './Task';

const Tasks = () => {
    const { tasks, dispatch } = useTaskState();
    const { user } = useUserState();
    const [draft, setDraft] = useLocalStorage('draft-task' + user.data.id);

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
            {draft && user.data.id && <Task key={draft.id} task={draft} draft={true} />}
            {tasks.map((task) => (
                <Task key={task.id} task={task} />
            ))}
        </div>
    );
};

export default Tasks;
