import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTaskState } from '../../context/task/TaskProvider';
import Button from '../Button';
import addTask from '../../context/task/actions/addTask';
import updateTask from '../../context/task/actions/updateTask';
import { useUserState } from '../../context/user/UserProvider';
import useLocalStorage from '../../hooks/use-local-storage';
import { useForm } from 'react-hook-form';

const AddTask = () => {
    const {
        register,
        handleSubmit,
        getValues,
        setValue,
        formState,
        formState: { errors },
    } = useForm();

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
    const SECONDS_MS = 5000;

    const text = () => getValues('text');

    const day = () => getValues('day');

    const reminder = () => getValues('reminder');
    const imgUrl = () => getValues('imgUrl');

    const onSubmit = async (data) => {
        if (!data.text) {
            alert('Please add Text');
            return;
        }
        if (isAddMode) {
            const newTask = {
                text: data.text,
                day: data.day,
                reminder: data.reminder,
                imgUrl: data.imgUrl,
                orderId: Number.MAX_SAFE_INTEGER,
                userId: user.data.id,
            };
            addTask(newTask)(dispatch);
            setDraft();
        } else {
            const updatedTask = {
                id: parseInt(id),
                text: data.text,
                day: data.day,
                reminder: data.reminder,
                imgUrl: data.imgUrl,
                orderId: data.orderId,
                userId: task.userId,
            };
            updateTask(updatedTask)(dispatch);
        }
        navigate('/');
    };

    const onCancelTask = (rdr) => {
        if (isAddMode) {
            if (text() || day() || reminder()) {
                setDraft({
                    text: text(),
                    day: day(),
                    reminder: reminder(),
                    imgUrl: imgUrl(),
                });
            }
        }
        if (rdr) navigate('/');
    };

    const onClearDraft = () => {
        setDraft();
        setLocalDraft();
        setValue('text', '');
        setValue('day', '');
        setValue('reminder', '');
        setValue('imgUrl', '');
    };

    useEffect(() => {
        const interval = setInterval(() => {
            onCancelTask(false);
        }, SECONDS_MS);
        return () => clearInterval(interval);
    }, [formState]);

    useEffect(() => {
        const getTask = (data) => {
            if (data) {
                setValue('text', data.text);
                setValue('day', data.day);
                setValue('reminder', data.reminder);
                setValue('imgUrl', data.imgUrl);
            }
        };
        setLocalDraft(isAddMode ? draft : null);

        getTask(isAddMode ? draft : task);
    }, [id, isAddMode, task]);

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
                        name="text"
                        type="text"
                        placeholder="Add Task"
                        // value={text}
                        {...register('text', { required: true, maxLength: 20 })}
                    />
                </div>
                <div className="form-control">
                    <label>Day & Time</label>
                    <input
                        name="day"
                        type="datetime-local"
                        placeholder="Add Day & Time"
                        //value={day}
                        {...register('day', { required: true })}
                    />
                </div>
                <div className="form-control">
                    <label>Image URL</label>
                    <input
                        name="imgUrl"
                        type="text"
                        placeholder="Add Image URL"
                        {...register('imgUrl', {
                            validate: checkImageWidth(),
                        })}
                    />
                    <img
                        style={{ maxWidth: '200px', clipPath: 'circle(190px at center)' }}
                        src={getValues('imgUrl')}
                    ></img>
                    <input
                        name="imgUrlWidth"
                        type="hidden"
                        {...register('imgUrlWidth', {
                            validate: (value) => value <= 1500,
                        })}
                    ></input>
                    {errors.day && <div style={{ color: 'red' }}>Day is required!!!!!!!</div>}
                    {errors.imgUrl && <div style={{ color: 'red' }}>Image is required!!!!!!!</div>}
                    {errors.imgUrlWidth && !errors.imgUrl && (
                        <div style={{ color: 'red' }}>
                            Image width is Bigger than 150 px !!!!!!!
                        </div>
                    )}
                    {console.log(errors)}
                </div>
                <div className="form-control form-control-check">
                    <label>Set Reminder</label>
                    <input name="reminder" type="checkbox" {...register('reminder')} />
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