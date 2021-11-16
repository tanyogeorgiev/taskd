import { createContext, useContext } from 'react';
import { useReducer } from 'react';
import userInitialState from './userInitialState';
import UserReducer from './UserReducer';

const UserContext = createContext(userInitialState);

const UserProvider = ({ children }) => {
    const [state, dispatch] = useReducer(UserReducer, userInitialState);

    return (
        <UserContext.Provider
            value={{
                user: state.user,
                dispatch,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export const useUserState = () => {
    const context = useContext(UserContext);

    if (!context) {
        throw Error('Wrong usage!');
    }

    return context;
};

export default UserProvider;
