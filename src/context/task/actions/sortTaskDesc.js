import { DESC, SORT_TASK } from '../../../constants';

const sortTaskDesc = (key, dispatch) => {
    dispatch({
        type: SORT_TASK,
        sortType: DESC,
        sortKey: key,
    });
};

export default sortTaskDesc;
