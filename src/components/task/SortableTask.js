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
import { useTaskState } from '../../context/task/TaskProvider';
import * as taskService from '../../api/services/Tasks';
import compareValues from '../../helper/compareValues';
import reorderTask from '../../context/task/actions/reorderTasks';

const SortableTasks = ({ children }) => {
    const { tasks, dispatch } = useTaskState();

    const debouncedSearch = useMemo(() => {
        const onSearchChange = (e) => {
            taskService.search(e.target.value).then((res) => {
                searchTasks(res.data, dispatch);
            });
        };

        return debounce(onSearchChange, 300);
    }, [dispatch]);

    const onSortTaskAsc = (sortKey) => {
        const newOrder = tasks.sort(compareValues(sortKey, 'ASC'));

        newOrder.map((task, i) => {
            localStorage.setItem(`order_${task.id}`, i);
            return { ...task, orderId: i };
        });
        reorderTask(newOrder, dispatch);
    };
    const onSortTaskDesc = (sortKey) => {
        const newOrder = tasks.sort(compareValues(sortKey, 'DESC'));

        newOrder.map((task, i) => {
            localStorage.setItem(`order_${task.id}`, i);
            return { ...task, orderId: i };
        });
        reorderTask(newOrder, dispatch);
    };
    return (
        <div>
            <div className={'leftPadding rightPadding'} style={{ float: 'left' }}>
                <b style={{ color: 'lightpink' }}> title </b>{' '}
                <FaSortAlphaDown
                    size={20}
                    className={('leftPadding', 'rightPadding')}
                    onClick={() => {
                        onSortTaskAsc('text');
                    }}
                    style={{ color: true ? 'lightblue' : 'tomato', cursor: 'pointer' }}
                ></FaSortAlphaDown>
                <FaSortAlphaDownAlt
                    size={20}
                    className={'rightPadding'}
                    onClick={() => {
                        onSortTaskDesc('text');
                    }}
                    style={{ color: true ? 'lightblue' : 'tomato', cursor: 'pointer' }}
                ></FaSortAlphaDownAlt>
                <b style={{ color: 'lightpink' }}>day</b>{' '}
                <FaSortNumericDown
                    size={20}
                    className={('leftPadding', 'rightPadding')}
                    onClick={() => {
                        onSortTaskAsc('day');
                    }}
                    style={{ color: true ? 'lightblue' : 'tomato', cursor: 'pointer' }}
                ></FaSortNumericDown>
                <FaSortNumericDownAlt
                    size={20}
                    className={('leftPadding', 'rightPadding')}
                    onClick={() => {
                        onSortTaskDesc('day');
                    }}
                    style={{ color: true ? 'lightblue' : 'tomato', cursor: 'pointer' }}
                ></FaSortNumericDownAlt>
                <b style={{ color: 'lightpink' }}>priority</b>{' '}
                <FaSortAmountDownAlt
                    size={20}
                    className={('leftPadding', 'rightPadding')}
                    onClick={() => {
                        onSortTaskAsc('priority');
                    }}
                    style={{ color: true ? 'lightblue' : 'tomato', cursor: 'pointer' }}
                ></FaSortAmountDownAlt>
                <FaSortAmountDown
                    size={20}
                    className={('leftPadding', 'rightPadding')}
                    onClick={() => {
                        onSortTaskDesc('priority');
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
