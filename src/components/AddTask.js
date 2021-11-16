import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useTaskState } from '../context/task/TaskProvider';
import Button from './Button';
import addTask from '../context/task/actions/addTask';
import updateTask from '../context/task/actions/updateTask';
import { useUserState } from '../context/user/UserProvider';

const AddTask = () => {
    const { id } = useParams();
    const isAddMode = !id;
    const [text, setText] = useState('');
    const [day, setDay] = useState('');
    const [reminder, setReminder] = useState(false);
    const { tasks, dispatch } = useTaskState();
    const { user } = useUserState();
    const navigate = useNavigate();
    const task = tasks.find((task) => task.id === parseInt(id));

    useEffect(() => {
        const getTask = () => {
            setText(task.text);
            setDay(task.day);
            setReminder(task.reminder);
        };
        if (!isAddMode) {
            getTask();
        }
    }, [id, isAddMode, task]);

    const onSubmit = async (e) => {
        e.preventDefault();

        if (!text) {
            alert('Please add Text');
            return;
        }
        if (isAddMode) {
            const newTask = { text, day, reminder, userId: user.data.id };
            addTask(newTask)(dispatch);
        } else {
            const updatedTask = { id: parseInt(id), text, day, reminder, userId: task.userId };
            updateTask(updatedTask)(dispatch);
        }
        navigate('/');
    };
    return (
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

            <input type="submit" value="Save Task" className="btn btn-block" />
            <Link to="/">
                <Button color="red" text="Cancel">
                    Close
                </Button>
            </Link>
        </form>
    );
};

export default AddTask;
