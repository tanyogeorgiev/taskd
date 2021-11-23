import { debounce } from 'lodash';
import { useMemo } from 'react';
import {
    FaSearch,
    FaSortAlphaDown,
    FaSortAlphaDownAlt,
    FaSortAmountDown,
    FaSortAmountDownAlt,
    FaSortNumericDown,
    FaSortNumericDownAlt,
} from 'react-icons/fa';
import searchTasks from '../../context/task/actions/searchTask';
import sortTaskAsc from '../../context/task/actions/sortTaskAsc';
import sortTaskDesc from '../../context/task/actions/sortTaskDesc';
import { useTaskState } from '../../context/task/TaskProvider';
import * as taskService from '../../api/services/Tasks';

const SortableTasks = ({ children }) => {
    const { dispatch } = useTaskState();

    const onSearchChange = (e) => {
        taskService.search(e.target.value).then((res) => {
            searchTasks(res.data, dispatch);
        });
    };
    const debouncedSearch = useMemo(() => {
        return debounce(onSearchChange, 300);
    }, []);

    return (
        <div>
            <div className={'leftPadding rightPadding'} style={{ float: 'left' }}>
                <b style={{ color: 'lightpink' }}> title </b>{' '}
                <FaSortAlphaDown
                    size={20}
                    className={('leftPadding', 'rightPadding')}
                    onClick={() => {
                        sortTaskAsc('text', dispatch);
                    }}
                    style={{ color: true ? 'lightblue' : 'tomato', cursor: 'pointer' }}
                ></FaSortAlphaDown>
                <FaSortAlphaDownAlt
                    size={20}
                    className={'rightPadding'}
                    onClick={() => {
                        sortTaskDesc('text', dispatch);
                    }}
                    style={{ color: true ? 'lightblue' : 'tomato', cursor: 'pointer' }}
                ></FaSortAlphaDownAlt>
                <b style={{ color: 'lightpink' }}>day</b>{' '}
                <FaSortNumericDown
                    size={20}
                    className={('leftPadding', 'rightPadding')}
                    onClick={() => {
                        sortTaskAsc('day', dispatch);
                    }}
                    style={{ color: true ? 'lightblue' : 'tomato', cursor: 'pointer' }}
                ></FaSortNumericDown>
                <FaSortNumericDownAlt
                    size={20}
                    className={('leftPadding', 'rightPadding')}
                    onClick={() => {
                        sortTaskDesc('day', dispatch);
                    }}
                    style={{ color: true ? 'lightblue' : 'tomato', cursor: 'pointer' }}
                ></FaSortNumericDownAlt>
                <b style={{ color: 'lightpink' }}>priority</b>{' '}
                <FaSortAmountDownAlt
                    size={20}
                    className={('leftPadding', 'rightPadding')}
                    onClick={() => {
                        sortTaskAsc('priority', dispatch);
                    }}
                    style={{ color: true ? 'lightblue' : 'tomato', cursor: 'pointer' }}
                ></FaSortAmountDownAlt>
                <FaSortAmountDown
                    size={20}
                    className={('leftPadding', 'rightPadding')}
                    onClick={() => {
                        sortTaskDesc('priority', dispatch);
                    }}
                    style={{ color: true ? 'lightblue' : 'tomato', cursor: 'pointer' }}
                ></FaSortAmountDown>
                <b style={{ color: 'lightpink' }}>search</b>{' '}
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
