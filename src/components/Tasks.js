import { useEffect } from 'react';
import getTask from '../context/task/actions/getTasks';
import { useTaskState } from '../context/task/TaskProvider';
import { useUserState } from '../context/user/UserProvider';
import useLocalStorage from '../hooks/use-local-storage';
import { ErrorBoundary } from 'react-error-boundary';

import Task from './Task';
import DraggableTask from './DraggableTask';

const Tasks = () => {
    const { tasks, dispatch } = useTaskState();
    const { user } = useUserState();
    const [draft] = useLocalStorage('draft-task' + user.data.id);

    useEffect(() => {
        const getTasks = async () => {
            if (user.data.id && tasks.length === 0) {
                getTask(user.data.id)(dispatch);
            }
        };
        getTasks();
    }, [user]);

    const renderCard = (task, index) => {
        return (
            <DraggableTask>
                <Task key={task.id} index={index} task={task} />
            </DraggableTask>
        );
    };

    function ErrorFallback({ error, resetErrorBoundary }) {
        return (
            <div role="alert">
                <p>Something went wrong:</p>
                <pre>{error.message}</pre>
                <button onClick={resetErrorBoundary}>Try again</button>
            </div>
        );
    }
    return (
        <div className="content">
            {draft && user.data.id && <Task key={draft.id} task={draft} draft={true} />}
            {tasks.map((task, i) => (
                // <Task key={task.id} task={task} />
                <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => {}}>
                    {renderCard(task, i)}
                </ErrorBoundary>
            ))}
        </div>
    );
};
export default Tasks;
