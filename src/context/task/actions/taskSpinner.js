import { TASK_LOADING } from '../../actionTypes';

const taskSpinner = (payload, dispatch) => {
    dispatch({
        type: TASK_LOADING,
        payload: payload,
    });
};

export default taskSpinner;
