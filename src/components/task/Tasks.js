import { useEffect, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { FaBorderAll, FaList } from 'react-icons/fa';

import getTask from '../../context/task/actions/getTasks';
import { useTaskState } from '../../context/task/TaskProvider';
import { useUserState } from '../../context/user/UserProvider';
import useLocalStorage from '../../hooks/use-local-storage';
import * as taskService from '../../api/services/Tasks';

import Task from './Task';
import DraggableTask from './DraggableTask';
import SortableTasks from './SortableTask';

const Tasks = () => {
    const { tasks, dispatch } = useTaskState();
    const { user } = useUserState();
    const draftName = 'draft-task' + user.data.id;
    const [draft] = useLocalStorage(draftName);
    const [cardLayout, setCardLayout] = useState(false);

    useEffect(() => {
        if (user.data.id && tasks.length === 0) {
            taskService.get(user.data.id).then((res) => {
                getTask(res.data, dispatch);
            });
        }
    }, [tasks.length, dispatch, user.data.id]);

    const renderCard = (task, index) => {
        task.orderId = task.orderId ? task.orderId : index;
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
            {user.data.id && (
                <>
                    <h1 className={'leftPadding ,  rightPadding'} style={{ float: 'right' }}>
                        <FaList
                            className="rightPadding"
                            onClick={() => {
                                setCardLayout(false);
                            }}
                            style={{
                                color: cardLayout ? 'lightblue' : 'tomato',
                                cursor: 'pointer',
                            }}
                        ></FaList>

                        <FaBorderAll
                            onClick={() => {
                                setCardLayout(true);
                            }}
                            style={{
                                color: cardLayout ? 'tomato' : 'lightblue',
                                cursor: 'pointer',
                            }}
                        ></FaBorderAll>
                    </h1>
                    <SortableTasks>
                        <div className={`content ${cardLayout ? 'cards' : ''}`}>
                            {draft && user.data.id && (
                                <Task key={draft.id} task={draft} draft={true} />
                            )}
                            {tasks
                                .sort((a, b) => a.orderId - b.orderId)
                                .map((task, i) => (
                                    // <Task key={task.id} task={task} />
                                    <ErrorBoundary
                                        FallbackComponent={ErrorFallback}
                                        onReset={() => {}}
                                    >
                                        <div className="col"> {renderCard(task, i)}</div>
                                    </ErrorBoundary>
                                ))}
                        </div>
                    </SortableTasks>
                </>
            )}
        </>
    );
};
export default Tasks;
