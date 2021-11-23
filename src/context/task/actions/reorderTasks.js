import { REORDER_TASKS } from '../../../constants';

const reorderTask = (payload, dispatch) => {
    dispatch({
        type: REORDER_TASKS,
        payload,
    });
};

export default reorderTask;
