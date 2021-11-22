import { CHANGE_USER } from '../../../constants';
import axiosWrapper from '../../../helper/axiosWrapper';

const register = (userName) => async (dispatch) => {
    const newUser = {
        name: userName,
        isAdmin: false,
    };
    await axiosWrapper()
        .get(`/users?name=${userName}`)
        .then(async (res) => {
            const userData = res.data[0];
            if (userData && userData.name === userName) {
                throw Error('Username already exists!');
            }
            return axiosWrapper()
                .post('/users', newUser)
                .then((res) => {
                    dispatch({
                        type: CHANGE_USER,
                        payload: res.data,
                    });
                });
        })
        .catch((err) => {
            throw err;
        });
};

export default register;
