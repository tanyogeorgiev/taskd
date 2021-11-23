import { ADD_TASK } from '../../../constants';

const addTask = (payload, dispatch) =>
    dispatch({
        type: ADD_TASK,
        payload: payload,
    });

export default addTask;
