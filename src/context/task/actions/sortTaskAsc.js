import { ASC, SORT_TASK } from '../../../constants';

const sortTaskAsc = (key) => (dispatch) => {
    dispatch({
        type: SORT_TASK,
        sortType: ASC,
        sortKey: key,
    });
};

export default sortTaskAsc;
