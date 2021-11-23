import { EDIT_TASK } from '../../../constants';

const toggleReminder = (payload, dispatch) =>
    dispatch({
        type: EDIT_TASK,
        payload: payload,
    });

export default toggleReminder;
