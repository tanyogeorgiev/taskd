import { CHANGE_USER } from '../actionTypes';

const reducer = (state, action) => {
    switch (action.type) {
        case CHANGE_USER:
            return {
                ...state,
                user: { ...state.user, data: action.payload, loading: false },
            };

        default:
            return state;
    }
};

export default reducer;
