import { useDarkModeState } from '../context/theme/ThemeProvider';

const DarkModeStatus = () => {
    const { darkTheme } = useDarkModeState();
    return darkTheme ? 'Dark' : 'Light';
};

export default DarkModeStatus;
