import axiosWrapper from '../../../helper/axiosWrapper';

const deleteTask = (id) => async (dispatch) => {
    axiosWrapper()
        .delete(`/tasks/${id}`)
        .then((res) => {
            dispatch({
                type: 'DELETE_TASK',
                payload: id,
            });
        });
};
export default deleteTask;
