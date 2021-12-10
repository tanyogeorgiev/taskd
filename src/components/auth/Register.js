import { useNavigate } from 'react-router-dom';
import register from '../../context/user/actions/register';
import { useUserState } from '../../context/user/UserProvider';
import * as userService from '../../api/services/Users';
import { Input, InputGroup, InputLeftElement, Button, Stack, useToast } from '@chakra-ui/react';
import { FaUserCircle } from 'react-icons/fa';

const Register = () => {
    const navigate = useNavigate();
    const { dispatch } = useUserState();
    const toast = useToast();
    const onSubmit = async (e) => {
        e.preventDefault();
        const userName = e.target[0].value;
        if (!userName) {
            return;
        }

        await userService
            .register(userName)
            .then((res) => {
                register(res.data, dispatch);
                navigate('/tasks/all');
                toast({
                    title: 'Auth information center',
                    description: 'You are successfully registered and logged in!',
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                });
            })
            .catch((err) => {
                toast({
                    title: 'Auth information center',
                    description: err.message,
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                });
            });
    };

    return (
        <form onSubmit={onSubmit} style={{ width: '500px', margin: 'auto' }}>
            <Stack spacing={3} align="center">
                <InputGroup>
                    <InputLeftElement
                        pointerEvents="none"
                        children={<FaUserCircle color="gray.300" />}
                    />
                    <Input placeholder="Enter username" label="Username" />
                </InputGroup>

                <Button colorScheme="teal" variant="outline" type="submit">
                    Register
                </Button>
            </Stack>
        </form>
    );
};

export default Register;
