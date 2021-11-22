import { debounce } from 'lodash';
import { useMemo } from 'react';
import {
    FaSearch,
    FaSortAlphaDown,
    FaSortAlphaDownAlt,
    FaSortNumericDown,
    FaSortNumericDownAlt,
} from 'react-icons/fa';
import searchTasks from '../../context/task/actions/searchTask';
import sortTaskAsc from '../../context/task/actions/sortTaskAsc';
import sortTaskDesc from '../../context/task/actions/sortTaskDesc';
import { useTaskState } from '../../context/task/TaskProvider';

const SortableTasks = ({ children }) => {
    const { dispatch } = useTaskState();

    const onSearchChange = (e) => {
        searchTasks(e.target.value)(dispatch);
    };
    const debouncedSearch = useMemo(() => {
        return debounce(onSearchChange, 300);
    }, []);

    return (
        <div>
            <div className={'leftPadding rightPadding'} style={{ float: 'left' }}>
                <b> title </b>{' '}
                <FaSortAlphaDown
                    size={20}
                    className={('leftPadding', 'rightPadding')}
                    onClick={() => {
                        sortTaskAsc('text')(dispatch);
                    }}
                    style={{ color: true ? 'lightblue' : 'tomato', cursor: 'pointer' }}
                ></FaSortAlphaDown>
                <FaSortAlphaDownAlt
                    size={20}
                    className={'rightPadding'}
                    onClick={() => {
                        sortTaskDesc('text')(dispatch);
                    }}
                    style={{ color: true ? 'lightblue' : 'tomato', cursor: 'pointer' }}
                ></FaSortAlphaDownAlt>
                <b>day</b>{' '}
                <FaSortNumericDown
                    size={20}
                    className={('leftPadding', 'rightPadding')}
                    onClick={() => {
                        sortTaskAsc('day')(dispatch);
                    }}
                    style={{ color: true ? 'lightblue' : 'tomato', cursor: 'pointer' }}
                ></FaSortNumericDown>
                <FaSortNumericDownAlt
                    size={20}
                    className={('leftPadding', 'rightPadding')}
                    onClick={() => {
                        sortTaskDesc('day')(dispatch);
                    }}
                    style={{ color: true ? 'lightblue' : 'tomato', cursor: 'pointer' }}
                ></FaSortNumericDownAlt>
                <b>search</b>{' '}
                <FaSearch
                    size={20}
                    className={('leftPadding', 'rightPadding')}
                    style={{ color: true ? 'lightblue' : 'tomato', cursor: 'pointer' }}
                ></FaSearch>
                <input type="text" onChange={debouncedSearch}></input>
            </div>
            {children}
        </div>
    );
};

export default SortableTasks;
