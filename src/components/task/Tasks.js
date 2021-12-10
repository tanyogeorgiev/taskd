import { useEffect, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { SimpleGrid, Flex, Text, Spinner } from '@chakra-ui/react';

import getTask from '../../context/task/actions/getTasks';

import { useTaskState } from '../../context/task/TaskProvider';
import { useUserState } from '../../context/user/UserProvider';
import * as taskService from '../../api/services/Tasks';

import Task from './Task';
import DraggableTask from './DraggableTask';
import SortableTasks from './SortableTask';
import TaskLayoutToggle from './TaskLayoutToggle';
import AddTaskModal from './AddTaskModal';
import DraftTask from './DraftTask';
import taskSpinner from '../../context/task/actions/taskSpinner';

const Tasks = () => {
    const { tasks, loading, dispatch } = useTaskState();
    const { user } = useUserState();
    const [cardLayout, setCardLayout] = useState(false);
    const [draftChange, setDraftChange] = useState(true);

    useEffect(() => {
        const getTasks = async () => {
            if (user.data.id && tasks.length === 0) {
                taskSpinner(true, dispatch);
                await taskService.get(user.data.id).then((res) => {
                    //little bit delay to simulate slow network
                    setTimeout(() => {
                        getTask(res.data, dispatch);
                    }, 500);
                });
            }
        };
        getTasks();
    }, [dispatch, user.data.id, tasks?.length]);

    const renderCard = (task, index) => {
        return (
            <DraggableTask key={task.id}>
                <Task index={index} task={task} />
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

    const onCloseAddTaskModal = () => {
        console.log('onCloseAddTaskModal');
        setDraftChange(!draftChange);
    };

    console.log('this is tasks:', loading);
    return (
        <DndProvider backend={HTML5Backend}>
            <ErrorBoundary FallbackComponent={ErrorFallback}>
                {user.data.id && (
                    <>
                        <Flex justifyContent="space-between">
                            <TaskLayoutToggle
                                onLayoutChange={setCardLayout}
                                cardLayout={cardLayout}
                            ></TaskLayoutToggle>
                            <AddTaskModal onCloseToggle={onCloseAddTaskModal} />
                        </Flex>
                        <SortableTasks>
                            <SimpleGrid
                                columns={` ${cardLayout ? '3' : '1'}`}
                                spacing="6"
                                p="3"
                                alignItems="center"
                            >
                                <DraftTask draftChange={draftChange} />
                                <Flex justifyContent="center">
                                    {loading && (
                                        <Spinner
                                            thickness="4px"
                                            speed="0.65s"
                                            emptyColor="gray.200"
                                            color="red.500"
                                            size="xl"
                                        />
                                    )}
                                </Flex>
                                {tasks.map((task, i) => renderCard(task, i))}
                            </SimpleGrid>
                        </SortableTasks>
                        {tasks?.length === 0 && (
                            <Text fontSize="xl" color="gray.400" align="center" pt={5}>
                                Well... nobody's here. Add some stuff 💪
                            </Text>
                        )}
                    </>
                )}
            </ErrorBoundary>
        </DndProvider>
    );
};
export default Tasks;
