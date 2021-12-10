import React, { createContext, useReducer, useContext } from 'react';
import taskInitialState from './taskInitialState';
import TaskReducer from './TaskReducer';

const GlobalContext = createContext(taskInitialState);

const TaskProvider = ({ children, value }) => {
    const [state, dispatch] = useReducer(TaskReducer, value ? value : taskInitialState);

    console.log('task provider', state);
    return (
        <GlobalContext.Provider
            value={{
                tasks: state.tasks,
                loading: state.loading,
                dispatch,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

export const useTaskState = () => {
    const context = useContext(GlobalContext);
    console.log('get task state', context.tasks);
    if (!context) {
        throw Error('Wrong usage');
    }
    return context;
};

export default TaskProvider;
