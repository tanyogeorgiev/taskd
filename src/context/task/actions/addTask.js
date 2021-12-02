import { ADD_TASK } from '../../actionTypes';

const addTask = async (payload, dispatch) =>
    dispatch({
        type: ADD_TASK,
        payload: payload,
    });

export default addTask;
