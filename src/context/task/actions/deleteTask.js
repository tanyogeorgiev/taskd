import { DELETE_TASKS } from '../../../constants';

const deleteTask = (id, dispatch) => {
    dispatch({
        type: DELETE_TASKS,
        payload: id,
    });
};
export default deleteTask;
