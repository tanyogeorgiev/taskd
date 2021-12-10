import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useLocalStorage from '../../hooks/use-local-storage';

import { useTaskState } from '../../context/task/TaskProvider';
import { useUserState } from '../../context/user/UserProvider';

import addTask from '../../context/task/actions/addTask';

import * as taskService from '../../api/services/Tasks';
import { Text, Button, toast, useToast } from '@chakra-ui/react';
import TaskForm from './TaskForm';

const AddTask = ({ onCancel }) => {
    const toast = useToast();

    //Task local state
    const [localDraft, setLocalDraft] = useState();
    const navigate = useNavigate();

    //Context states
    const { dispatch } = useTaskState();
    const { user } = useUserState();
    const [draft, setDraft] = useLocalStorage('draft-task' + user.data.id);
    const [onReset, setOnReset] = useState(false);
    console.log('ADDD');

    const onSubmit = async (data) => {
        console.log('SUBMITTING', data);
        const formTask = {
            text: '',
            day: '',
            reminder: '',
            imgUrl: '',
            orderId: '',
            priority: data.priority,
            userId: user.data.id,
            ...data.regInput,
        };

        await taskService
            .add({ ...formTask, orderId: Number.MAX_SAFE_INTEGER })
            .then(async (res) => {
                addTask(res.data, dispatch);
                setDraft();
                toast({
                    title: 'Task Information Center.',
                    description: 'You are successfully Add new task',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                });
            });
        onCancel ? onCancel() : navigate('/tasks/all');
    };

    const onCancelTask = () => {
        console.log('cancel 2');

        onCancel ? onCancel() : navigate('/tasks/all');
    };

    const onSaveDraft = (formData) => {
        console.log('saveDraft', formData);
        if (formData) {
            setDraft(formData);
        }
    };

    const onClearDraft = () => {
        console.log('clear draft');
        setDraft();
        setLocalDraft();
        setOnReset(true);
    };

    useEffect(() => {
        setLocalDraft(draft);
    }, [draft]);

    return (
        <>
            <Text fontSize="4xl" color="rgb(136 165 197)">
                ADD TASK
            </Text>
            {localDraft && (
                <Text>
                    FROM<b style={{ color: 'silver' }}> DRAFT</b>
                </Text>
            )}
            {localDraft && (
                <>
                    <Button color="salmon" text="Clear" onClick={onClearDraft}>
                        Clear Draft
                    </Button>
                </>
            )}

            <TaskForm
                onFormSubmit={onSubmit}
                task={draft}
                onCancel={onCancelTask}
                onSaveDraft={onSaveDraft}
                onReset={onReset}
            />
        </>
    );
};

export default AddTask;
