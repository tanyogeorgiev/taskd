import axiosWrapper from '../../../helper/axiosWrapper';
import { ADD_TASK } from '../../../constants';

const addTask = (payload) => async (dispatch) => {
    axiosWrapper()
        .post('/tasks', payload)
        .then((res) => {
            dispatch({
                type: ADD_TASK,
                payload: res.data,
            });
        });
};

export default addTask;
