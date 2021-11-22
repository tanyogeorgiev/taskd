import { GET_TASKS, TASK_LOADING } from '../../../constants';
import axiosWrapper from '../../../helper/axiosWrapper';

const getTask = (payload) => async (dispatch) => {
    dispatch({
        type: TASK_LOADING,
    });

    axiosWrapper()
        .get(`/tasks?userId=${payload}`)
        .then((res) => {
            dispatch({
                type: GET_TASKS,
                payload: res.data,
            });
        });
};

export default getTask;
