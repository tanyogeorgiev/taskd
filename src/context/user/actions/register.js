import { CHANGE_USER } from '../../../constants';

const register = (user, dispatch) => {
    dispatch({
        type: CHANGE_USER,
        payload: user,
    });
};

export default register;
