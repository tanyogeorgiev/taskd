import { createContext, useContext } from 'react';
import useDarkMode from '../../hooks/use-dark-mode';
const GlobalContext = createContext();

const ThemeProvider = ({ children }) => {
    const [darkTheme, setDarkTheme] = useDarkMode();

    return (
        <GlobalContext.Provider
            value={{
                darkTheme,
                setDarkTheme,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

export const useDarkModeState = () => {
    const context = useContext(GlobalContext);
    if (!context) {
        throw Error('Wrong usage');
    }
    return context;
};

export default ThemeProvider;
