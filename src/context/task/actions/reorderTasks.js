import { REORDER_TASKS } from '../../actionTypes';

const reorderTask = (payload, dispatch) => {
    console.log('reorder');
    dispatch({
        type: REORDER_TASKS,
        payload,
    });
};

export default reorderTask;
