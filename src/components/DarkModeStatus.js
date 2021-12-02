//import { useDarkModeState } from '../context/theme/ThemeProvider';
import { useColorMode } from '@chakra-ui/react';

const DarkModeStatus = () => {
    const { colorMode } = useColorMode();
    return colorMode ? 'Dark' : 'Light';
};

export default DarkModeStatus;
