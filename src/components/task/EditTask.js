import { useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useTaskState } from '../../context/task/TaskProvider';
import { useUserState } from '../../context/user/UserProvider';

import updateTask from '../../context/task/actions/updateTask';

import * as taskService from '../../api/services/Tasks';
import { Text } from '@chakra-ui/react';

import TaskForm from './TaskForm';

const EditTask = ({ onCancel, task }) => {
    //url params and navigation
    let { id } = useParams();
    const navigate = useNavigate();

    //Context states
    const { tasks, dispatch } = useTaskState();
    const { user } = useUserState();
    let localTask = { ...task };

    if (!id) {
        id = task.id;
    } else {
        localTask = { ...tasks.find((task) => task.id === parseInt(id)) };
    }

    console.log('EDIT', task);

    const onSubmit = async (data) => {
        console.log('SUBMITTING', data);

        const formTask = {
            text: '',
            day: '',
            reminder: '',
            imgUrl: '',
            orderId: '',
            priority: '',
            userId: user.data.id,
            ...data.regInput,
        };

        await taskService.update({ ...formTask, id: parseInt(id) }).then((res) => {
            updateTask(res.data, dispatch);
        });

        onCancel ? onCancel() : navigate('/tasks/all');
    };

    const onCancelTask = useCallback(() => {
        console.log('onCancelTask  Edit Task');
        onCancel ? onCancel() : navigate('/tasks/all');
    }, [navigate, onCancel]);

    return (
        <>
            <Text fontSize="4xl" color="rgb(136 165 197)">
                EDIT TASK
            </Text>
            <TaskForm
                onFormSubmit={onSubmit}
                task={localTask}
                onCancel={onCancelTask}
                submitText="SAVE"
            />
        </>
    );
};

export default EditTask;
