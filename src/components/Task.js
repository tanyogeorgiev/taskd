import { FaTimes, FaEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import deleteTask from '../context/task/actions/deleteTask';
import toggleReminder from '../context/task/actions/toggleReminder';
import { useTaskState } from '../context/task/TaskProvider';

const Task = ({ task }) => {
    const { dispatch } = useTaskState();

    return (
        <div
            className={`task ${task.reminder ? 'reminder' : ''}`}
            onDoubleClick={() => toggleReminder(task.id)(dispatch)}
        >
            <h3>
                {task.text}
                <div className="icons">
                    <Link to={`/addtask/${task.id}`} className="rightPadding">
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
            <p>{task.id}</p>
        </div>
    );
};

export default Task;
