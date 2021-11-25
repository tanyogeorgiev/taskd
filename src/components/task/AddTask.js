import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useLocalStorage from '../../hooks/use-local-storage';
import { useForm } from 'react-hook-form';

import { useTaskState } from '../../context/task/TaskProvider';
import { useUserState } from '../../context/user/UserProvider';

import updateTask from '../../context/task/actions/updateTask';
import addTask from '../../context/task/actions/addTask';

import * as taskService from '../../api/services/Tasks';

import Button from '../Button';

const AddTask = () => {
    const { register, handleSubmit, getValues, setValue, formState, reset } = useForm();

    //url params and navigation
    const { id } = useParams();
    const navigate = useNavigate();

    //Task local state
    const [localDraft, setLocalDraft] = useState();

    //Context states
    const { tasks, dispatch } = useTaskState();
    const { user } = useUserState();
    const [draft, setDraft] = useLocalStorage('draft-task' + user.data.id);

    const task = tasks.find((task) => task.id === parseInt(id));
    const isAddMode = !id;

    console.log('ADDD', isAddMode);

    const onSubmit = async (data) => {
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
        if (isAddMode) {
            await taskService
                .add({ ...formTask, orderId: Number.MAX_SAFE_INTEGER })
                .then(async (res) => {
                    addTask(res.data, dispatch);
                    setDraft();
                });
        } else {
            await taskService.update({ ...formTask, id: parseInt(id) }).then((res) => {
                updateTask(res.data, dispatch);
            });
        }
        navigate('/tasks/all');
    };

    const isInputsEmpty = useCallback(() => {
        return (
            getValues('regInput.text') ||
            getValues('regInput.day') ||
            getValues('regInput.reminder')
        );
    }, [getValues]);

    const onCancelTask = useCallback(
        (rdr) => {
            console.log('onCancel');
            if (isAddMode) {
                if (!isInputsEmpty()) {
                    setDraft(getValues().regInput);
                }
            }
            if (rdr) navigate('/tasks/all');
        },
        [navigate, setDraft, isAddMode, getValues, isInputsEmpty]
    );

    const onClearDraft = () => {
        setDraft();
        setLocalDraft();
        reset();
    };

    useEffect(() => {
        const getTask = (data) => {
            if (data) {
                setValue('regInput', data);
            }
        };
        setLocalDraft(isAddMode ? draft : null);

        getTask(isAddMode ? draft : task);
    }, [draft, isAddMode, setValue, task]);

    const checkImageWidth = async function () {
        let img = new Image();
        img.src = getValues('imgUrl');
        return (img.onload = function () {
            setValue('imgUrlWidth', this.width);
        });
    };

    return (
        <>
            <h3>
                {isAddMode ? 'NEW' : 'EDIT'} TASK
                {localDraft && isAddMode && (
                    <span>
                        {' '}
                        FROM<b style={{ color: 'silver' }}> DRAFT</b>
                    </span>
                )}
                {localDraft && isAddMode && (
                    <div>
                        <Button color="salmon" text="Clear Draft" onClick={onClearDraft} />{' '}
                    </div>
                )}
            </h3>
            <form className="add-form" onSubmit={handleSubmit(onSubmit)}>
                <div className="form-control">
                    <label>Task</label>
                    <input
                        type="text"
                        placeholder="Add Task"
                        // value={text}
                        {...register('regInput.text', {
                            required: {
                                value: true,
                                message: 'Task name field is required',
                            },
                            maxLength: { value: 20, message: 'Max Lenght is 20' },
                        })}
                    />
                </div>
                <div className="form-control">
                    <label>Day & Time</label>
                    <input
                        type="datetime-local"
                        placeholder="Add Day & Time"
                        {...register('regInput.day', {
                            required: {
                                value: true,
                                message: 'Day field is required',
                            },
                        })}
                    />
                </div>
                <div className="form-control">
                    <label>Image URL</label>
                    <input
                        type="text"
                        placeholder="Add Image URL"
                        {...register('regInput.imgUrl', {
                            validate: checkImageWidth(),
                        })}
                    />
                    {getValues('regInput.imgUrl') && (
                        <img
                            alt="task"
                            style={{ maxWidth: '200px', clipPath: 'circle(190px at center)' }}
                            src={getValues('imgUrl')}
                        ></img>
                    )}
                    <input
                        type="hidden"
                        {...register('regInput.imgUrlWidth', {
                            validate: (value) => value <= 1500,
                        })}
                    ></input>
                    {formState.errors?.regInput?.text && (
                        <div style={{ color: 'red' }}>{formState.errors.regInput.text.message}</div>
                    )}
                    {formState.errors?.regInput?.day && (
                        <div style={{ color: 'red' }}>{formState.errors.regInput.day.message}</div>
                    )}
                    {formState.errors?.regInput?.imgUrl && (
                        <div style={{ color: 'red' }}>Image is required!!!!!!!</div>
                    )}
                    {formState.errors?.regInput?.imgUrlWidth && !formState.errors.imgUrl && (
                        <div style={{ color: 'red' }}>
                            Image width is Bigger than 150 px !!!!!!!
                        </div>
                    )}
                </div>
                <div className="form-control form-control-select">
                    <label>Priority</label>
                    <select {...register('regInput.priority')}>
                        <option style={{ color: 'mediumaquamarine' }} value="1">
                            Low
                        </option>
                        <option value="2" style={{ color: 'sandybrown' }}>
                            Normal
                        </option>
                        <option value="3" style={{ color: 'tomato' }}>
                            High
                        </option>
                    </select>
                </div>
                <div className="form-control form-control-check">
                    <label>Set Reminder</label>
                    <input name="reminder" type="checkbox" {...register('regInput.reminder')} />
                </div>
                <div className="form-control">
                    <input type="submit" value="Save Task" className="btn btn-block" />
                </div>
            </form>
            <div className="form-control">
                <Button
                    color="red"
                    text="Cancel"
                    onClick={() => {
                        onCancelTask(true);
                    }}
                >
                    Close
                </Button>
            </div>
        </>
    );
};

export default AddTask;
