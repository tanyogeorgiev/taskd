import { LOGOUT_USER } from '../../actionTypes';

export const logout = (dispatch) => {
    dispatch({
        type: LOGOUT_USER,
    });
};

export default logout;
