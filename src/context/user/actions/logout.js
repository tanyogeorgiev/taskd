import { LOGOUT_USER } from '../../../constants';

export const logout = () => (dispatch) => {
    dispatch({
        type: LOGOUT_USER,
    });
};

export default logout;
