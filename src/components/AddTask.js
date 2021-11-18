import { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useTaskState } from '../context/task/TaskProvider';
import Button from './Button';
import addTask from '../context/task/actions/addTask';
import updateTask from '../context/task/actions/updateTask';
import { useUserState } from '../context/user/UserProvider';
import useLocalStorage from '../hooks/use-local-storage';

const AddTask = () => {
    //url params and navigation
    const { id } = useParams();
    const navigate = useNavigate();

    //Task local state
    const [text, setText] = useState('');
    const [day, setDay] = useState('');
    const [reminder, setReminder] = useState(false);
    const [localDraft, setLocalDraft] = useState();

    //Context states
    const { tasks, dispatch } = useTaskState();
    const { user } = useUserState();
    const [draft, setDraft] = useLocalStorage('draft-task' + user.data.id);

    const task = tasks.find((task) => task.id === parseInt(id));
    const isAddMode = !id;
    const SECONDS_MS = 5000;

    const onSubmit = async (e) => {
        e.preventDefault();

        if (!text) {
            alert('Please add Text');
            return;
        }
        if (isAddMode) {
            const newTask = { text, day, reminder, userId: user.data.id };
            addTask(newTask)(dispatch);
            setDraft();
        } else {
            const updatedTask = { id: parseInt(id), text, day, reminder, userId: task.userId };
            updateTask(updatedTask)(dispatch);
        }
        navigate('/');
    };

    const onCancelTask = (rdr) => {
        if (text || day || reminder) {
            setDraft({ text, day, reminder });
        }

        if (rdr) navigate('/');
    };

    const onClearDraft = () => {
        setDraft();
        setLocalDraft();
        setText('');
        setDay('');
        setReminder(false);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            onCancelTask(false);
        }, SECONDS_MS);
        return () => clearInterval(interval);
    }, [text, day, reminder]);

    useEffect(() => {
        const getTask = (data) => {
            if (data) {
                setText(data.text);
                setDay(data.day);
                setReminder(data.reminder);
            }
        };
        setLocalDraft(isAddMode ? draft : null);

        getTask(isAddMode ? draft : task);
    }, [id, isAddMode, task]);

    return (
        <>
            {' '}
            <h3>
                {isAddMode ? 'NEW' : 'EDIT'} TASK
                {localDraft && isAddMode && (
                    <span>
                        {' '}
                        FROM<b style={{ color: 'silver' }}> DRAFT</b>
                    </span>
                )}
   
            {localDraft && isAddMode && (
                <div   ><Button color="salmon" text="Clear Draft" onClick={onClearDraft} /> </div>
            )}
                     </h3>
            <form className="add-form" onSubmit={onSubmit}>
                <div className="form-control">
                    <label>Task</label>
                    <input
                        type="text"
                        placeholder="Add Task"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                </div>
                <div className="form-control">
                    <label>Day & Time</label>
                    <input
                        type="text"
                        placeholder="Add Day & Time"
                        value={day}
                        onChange={(e) => setDay(e.target.value)}
                    />
                </div>
                <div className="form-control form-control-check">
                    <label>Set Reminder</label>
                    <input
                        type="checkbox"
                        value={reminder}
                        checked={reminder}
                        onChange={(e) => setReminder(e.currentTarget.checked)}
                    />
                </div>
                    <div className="form-control">
                <input type="submit" value="Save Task" className="btn btn-block" /></div>
                {/* <Link to="/"> */}

                {/* </Link> */}
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
