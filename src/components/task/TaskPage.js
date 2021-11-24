import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Route, Routes } from 'react-router';
import { TaskProvider } from '../../context';
import AddTask from './AddTask';
import Tasks from './Tasks';
const TaskPage = () => {
    return (
        <DndProvider backend={HTML5Backend}>
            <TaskProvider>
                <Routes>
                    <Route path="all" exact element={<Tasks />} />
                    <Route path="add" exact element={<AddTask />} />
                    <Route path="edit" exact element={<AddTask />} />
                    <Route path="edit/:id" exact element={<AddTask />} />
                </Routes>
            </TaskProvider>
        </DndProvider>
    );
};
export default TaskPage;
