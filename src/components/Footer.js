import { useColorModeValue, Box, Container, Stack, Text } from '@chakra-ui/react';
const Footer = () => {
    return (
        <Box
            bg={useColorModeValue('gray.50', 'gray.900')}
            color={useColorModeValue('gray.700', 'gray.200')}
            justifyContent="center"
            sx={{ position: 'fixed', bottom: '0', width: '100%' }}
        >
            <Container
                as={Stack}
                maxW={'6xl'}
                py={4}
                direction={{ base: 'column', md: 'row' }}
                spacing={4}
                justify={{ base: 'center', md: 'center' }}
                align={{ base: 'center', md: 'center' }}
            >
                <Text>© 2021 All rights reserved</Text>
            </Container>
        </Box>
    );
};

export default Footer;
