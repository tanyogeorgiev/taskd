import taskInitialState from './taskInitialState';
import {
    GET_TASKS,
    ADD_TASK,
    EDIT_TASK,
    LOGOUT_USER,
    DELETE_TASKS,
    REORDER_TASKS,
    TASK_LOADING,
} from '../actionTypes';

const reducer = (state, action) => {
    switch (action.type) {
        case TASK_LOADING:
            return { ...state, loading: action.payload };

        case GET_TASKS:
            return {
                ...state,
                tasks: action.payload,
                loading: false,
            };
        case DELETE_TASKS:
            return {
                ...state,
                tasks: state.tasks.filter((task) => task.id !== action.payload),
            };
        case ADD_TASK:
            return {
                ...state,
                tasks: [...state.tasks, action.payload],
            };

        case EDIT_TASK:
            const updatedTask = action.payload;
            return {
                ...state,
                tasks: state.tasks.map((item) => {
                    if (parseInt(item.id) === parseInt(updatedTask.id)) {
                        return updatedTask;
                    }
                    return item;
                }),
            };
        case LOGOUT_USER:
            return {
                ...state,
                tasks: taskInitialState.tasks,
            };

        case REORDER_TASKS:
            return {
                ...state,
                tasks: action.payload,
            };
        default:
            return state;
    }
};

export default reducer;
