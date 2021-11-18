import { EDIT_TASK } from '../../../constants';
import axiosWrapper from '../../../helper/axiosWrapper';

const updateTask = (payload) => async (dispatch) => {
    const updatedTask = { ...payload };

    axiosWrapper()
        .patch(`/tasks/${updatedTask.id}`, updatedTask)
        .then((res) => {
            dispatch({
                type: EDIT_TASK,
                payload: res.data,
            });
        });
};

export default updateTask;
