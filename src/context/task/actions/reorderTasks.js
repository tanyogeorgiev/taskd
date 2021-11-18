import { REORDER_TASKS } from '../../../constants';

const reorderTask = (payload) => async (dispatch) => {
    dispatch({
        type: REORDER_TASKS,
        payload,
    });
};

export default reorderTask;
