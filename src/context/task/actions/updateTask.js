import { EDIT_TASK } from '../../actionTypes';
const updateTask = (payload, dispatch) =>
    dispatch({
        type: EDIT_TASK,
        payload: payload,
    });
export default updateTask;
