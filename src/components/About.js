import { Link } from 'react-router-dom';
import DarkModeStatus from './DarkModeStatus';
import { Box, Text } from '@chakra-ui/react';

const About = () => {
    return (
        <Box>
            <Text> Version 1.0.1</Text>
            <Text>
                Current Theme mode is:
                <DarkModeStatus />
            </Text>
            <Link to="/tasks/all">View tasks.</Link>
        </Box>
    );
};

export default About;
