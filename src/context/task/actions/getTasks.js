import { GET_TASKS, TASK_LOADING } from '../../actionTypes';
const getTask = (payload, dispatch) => {
    dispatch({
        type: TASK_LOADING,
    });
    dispatch({
        type: GET_TASKS,
        payload: payload,
    });
};

export default getTask;
