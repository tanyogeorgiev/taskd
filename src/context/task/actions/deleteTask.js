import { DELETE_TASKS } from '../../../constants';
import axiosWrapper from '../../../helper/axiosWrapper';

const deleteTask = (id) => async (dispatch) => {
    axiosWrapper()
        .delete(`/tasks/${id}`)
        .then((res) => {
            dispatch({
                type: DELETE_TASKS,
                payload: id,
            });
        });
};
export default deleteTask;
