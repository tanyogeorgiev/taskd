import { EDIT_TASK } from '../../../constants';
const updateTask = (payload, dispatch) =>
    dispatch({
        type: EDIT_TASK,
        payload: payload,
    });
export default updateTask;
