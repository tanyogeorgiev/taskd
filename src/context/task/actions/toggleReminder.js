import { EDIT_TASK } from '../../actionTypes';

const toggleReminder = (payload, dispatch) =>
    dispatch({
        type: EDIT_TASK,
        payload: payload,
    });

export default toggleReminder;
