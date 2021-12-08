import { Route, Routes } from 'react-router';
import { TaskProvider } from '../../context';
import AddTask from './AddTask';
import EditTask from './EditTask';
import Tasks from './Tasks';
const TaskPage = () => {
    return (
        <TaskProvider>
            <Routes>
                <Route path="all" exact element={<Tasks />} />
                <Route path="add" exact element={<AddTask />} />
                <Route path="edit/:id" exact element={<EditTask />} />
            </Routes>
        </TaskProvider>
    );
};
export default TaskPage;
