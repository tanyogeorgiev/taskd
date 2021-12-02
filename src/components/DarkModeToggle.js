import { useColorMode, Stack, Switch, IconButton } from '@chakra-ui/react';
import { FaMoon, FaSun } from 'react-icons/fa';

const DarkMode = () => {
    const { colorMode, toggleColorMode } = useColorMode();

    const onButtonsClick = (buttonMode) => {
        if (buttonMode === colorMode) return;
        toggleColorMode();
    };
    return (
        <>
            <Stack direction="row" alignItems="center">
                <IconButton
                    variant="unstyled"
                    colorScheme="Orange"
                    icon={
                        <FaSun
                            style={{ margin: 'auto' }}
                            size={25}
                            color={colorMode !== 'dark' ? 'gold' : 'gray'}
                        />
                    }
                    p={0}
                    marginLeft="0"
                    onClick={() => onButtonsClick('light')}
                />
                <Switch
                    colorScheme="orange"
                    size="lg"
                    style={{ margin: 'auto' }}
                    onChange={toggleColorMode}
                    isChecked={colorMode === 'dark'}
                />
                <IconButton
                    variant="unstyled"
                    colorScheme="Orange"
                    icon={<FaMoon size={25} color={colorMode === 'dark' ? 'gold' : 'gray'} />}
                    onClick={() => onButtonsClick('dark')}
                />
            </Stack>
        </>
    );
};

export default DarkMode;
