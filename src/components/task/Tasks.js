import { useEffect, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import getTask from '../../context/task/actions/getTasks';
import { useTaskState } from '../../context/task/TaskProvider';
import { useUserState } from '../../context/user/UserProvider';
import useLocalStorage from '../../hooks/use-local-storage';
import * as taskService from '../../api/services/Tasks';

import Task from './Task';
import DraggableTask from './DraggableTask';
import SortableTasks from './SortableTask';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import TaskLayoutToggle from './TaskLayoutToggle';
import { SimpleGrid, Flex, Text, useColorModeValue } from '@chakra-ui/react';
import AddTaskModal from './AddTaskModal';
import AddTask from './AddTask';

const Tasks = () => {
    const { tasks, dispatch } = useTaskState();
    const { user } = useUserState();
    const draftName = 'draft-task' + user.data.id;
    const [draft] = useLocalStorage(draftName);
    const [cardLayout, setCardLayout] = useState(false);
    useEffect(() => {
        const getTasks = async () => {
            if (user.data.id && tasks.length === 0) {
                await taskService.get(user.data.id).then((res) => {
                    getTask(res.data, dispatch);
                });
                console.log('fetch tasks');
            }
        };
        getTasks();
    }, [dispatch, user.data.id, tasks.length]);

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
                            <AddTaskModal>
                                <AddTask />
                            </AddTaskModal>
                        </Flex>
                        <SortableTasks>
                            <SimpleGrid
                                columns={` ${cardLayout ? '3' : '1'}`}
                                spacing="6"
                                p="3"
                                alignItems="center"
                            >
                                {draft && user.data.id && <Task task={draft} draft={true} />}
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
