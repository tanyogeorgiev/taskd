import { useEffect, useState } from 'react';
import getTask from '../context/task/actions/getTasks';
import { useTaskState } from '../context/task/TaskProvider';
import { useUserState } from '../context/user/UserProvider';
import useLocalStorage from '../hooks/use-local-storage';
import { ErrorBoundary } from 'react-error-boundary';

import Task from './Task';
import DraggableTask from './DraggableTask';
import { FaBorderAll, FaList } from 'react-icons/fa';

const Tasks = () => {
    const { tasks, dispatch } = useTaskState();
    const { user } = useUserState();
    const [draft] = useLocalStorage('draft-task' + user.data.id);
    const [cardLayout, setCardLayout] = useState(false);

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

    const ErrorFallback = ({ error, resetErrorBoundary }) => {
        return (
            <div role="alert">
                <p>Something went wrong:</p>
                <pre>{error.message}</pre>
                <button onClick={resetErrorBoundary}>Try again</button>
            </div>
        );
    };
    return (
        <>
            <h1 className={('leftPadding', 'rightPadding')} style={{ float: 'right' }}>
                <FaList
                    className="rightPadding"
                    onClick={() => {
                        setCardLayout(false);
                    }}
                    style={{ color: cardLayout ? 'lightblue' : 'tomato', cursor: 'pointer' }}
                ></FaList>

                <FaBorderAll
                    onClick={() => {
                        setCardLayout(true);
                    }}
                    style={{ color: cardLayout ? 'tomato' : 'lightblue', cursor: 'pointer' }}
                ></FaBorderAll>
            </h1>

            <div className={`content ${cardLayout ? 'cards' : ''}`}>
                {draft && user.data.id && <Task key={draft.id} task={draft} draft={true} />}
                {tasks.map((task, i) => (
                    // <Task key={task.id} task={task} />
                    <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => {}}>
                        <div className="col"> {renderCard(task, i)}</div>
                    </ErrorBoundary>
                ))}
            </div>
        </>
    );
};
export default Tasks;
