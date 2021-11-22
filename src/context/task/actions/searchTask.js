import { GET_TASKS } from '../../../constants';
import axiosWrapper from '../../../helper/axiosWrapper';

const searchTasks = (payload) => (dispatch) => {
    axiosWrapper()
        .get(`/tasks?q=${payload}`)
        .then((res) => {
            dispatch({
                type: GET_TASKS,
                payload: res.data,
            });
        });
};
export default searchTasks;
