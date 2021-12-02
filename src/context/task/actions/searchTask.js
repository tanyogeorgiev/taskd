import { GET_TASKS } from '../../actionTypes';

const searchTasks = (payload, dispatch) =>
    dispatch({
        type: GET_TASKS,
        payload: payload,
    });

export default searchTasks;
