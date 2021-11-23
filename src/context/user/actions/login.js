import { CHANGE_USER } from '../../../constants';

const login = (user, dispatch) => {
    localStorage.setItem('userId', user.id);
    localStorage.setItem('userName', user.name);
    localStorage.setItem('token', user.token);

    dispatch({
        type: CHANGE_USER,
        payload: user,
    });
};

export default login;
