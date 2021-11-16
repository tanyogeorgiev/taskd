import { CHANGE_USER } from '../../../constants';
import axiosWrapper from '../../../helper/axiosWrapper';

const register = (userName) => async (dispatch) => {
    const newUser = {
        name: userName,
        isAdmin: false,
    };
    axiosWrapper()
        .post('/users', newUser)
        .then((res) => {
            dispatch({
                type: CHANGE_USER,
                payload: res.data,
            });
        });
};

export default register;
