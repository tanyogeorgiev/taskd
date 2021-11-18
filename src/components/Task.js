import { FaTimes, FaEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import deleteTask from '../context/task/actions/deleteTask';
import toggleReminder from '../context/task/actions/toggleReminder';
import { useTaskState } from '../context/task/TaskProvider';

const Task = ({ task, draft, index }) => {
    const { dispatch } = useTaskState();
    const onToggleReminder = (id) => {
        if (!draft) toggleReminder(task.id)(dispatch);
    };

    return (
        <div
            className={`task ${task.reminder ? 'reminder' : ''} ${draft ? 'draft' : ''} card`}
            onDoubleClick={() => onToggleReminder(task.id)}
        >
            {' '}
            {draft && <i>Draft</i>}
            <h3>
                {task.text}
                <div className="icons">
                    <Link to={`/addtask/${!draft ? task.id : ''}`} className="rightPadding">
                        {' '}
                        <FaEdit style={{ color: 'lightslategrey' }} />
                    </Link>

                    <FaTimes
                        style={{ color: 'tomato', cursor: 'pointer' }}
                        onClick={() => deleteTask(task.id)(dispatch)}
                    />
                </div>
            </h3>
            <p>{task.day}</p>
        </div>
    );
};

export default Task;
