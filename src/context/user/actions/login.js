import { CHANGE_USER } from '../../../constants';
import axiosWrapper from '../../../helper/axiosWrapper';

const login = (user) => async (dispatch) => {
    axiosWrapper()
        .get(`/users?name=${user}`)
        .then((res) => {
            const userData = res.data[0];
            if (userData && userData.name === user) {
                localStorage.setItem('userId', userData.id);
                localStorage.setItem('userName', userData.name);
                localStorage.setItem('token', res.token);

                dispatch({
                    type: CHANGE_USER,
                    payload: userData,
                });
            }
        });
};

export default login;
