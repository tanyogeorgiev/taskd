import { DELETE_TASKS } from '../../actionTypes';

const deleteTask = (id, dispatch) => {
    dispatch({
        type: DELETE_TASKS,
        payload: id,
    });
};
export default deleteTask;
