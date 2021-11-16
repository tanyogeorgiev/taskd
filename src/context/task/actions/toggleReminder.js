import axiosWrapper from '../../../helper/axiosWrapper';

const toggleReminder = (id) => async (dispatch) => {
    axiosWrapper()
        .get(`tasks/${id}`)
        .then((res) => {
            const updatedTask = { ...res.data, reminder: !res.data.reminder };
            return axiosWrapper().patch(`/tasks/${id}`, updatedTask);
        })
        .then((res) => {
            dispatch({
                type: 'EDIT_TASK',
                payload: res.data,
            });
        })

        .catch((err) => {
            console.log('toggleReminder Error', err);
        });
};

export default toggleReminder;
