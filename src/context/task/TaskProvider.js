import React, { createContext, useReducer, useContext } from 'react';
import taskInitialState from './taskInitialState';
import TaskReducer from './TaskReducer';

const GlobalContext = createContext(taskInitialState);

const TaskProvider = ({ children }) => {
    const [state, dispatch] = useReducer(TaskReducer, taskInitialState);

    return (
        <GlobalContext.Provider
            value={{
                tasks: state.tasks,
                dispatch,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

export const useTaskState = () => {
    const context = useContext(GlobalContext);
    if (!context) {
        throw Error('Wrong usage');
    }
    return context;
};

export default TaskProvider;
