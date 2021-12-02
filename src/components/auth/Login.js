import { useNavigate } from 'react-router-dom';
import login from '../../context/user/actions/login';
import { useUserState } from '../../context/user/UserProvider';
import * as userService from '../../api/services/Users';
import { Input, InputGroup, InputLeftElement, Button, Stack, Container } from '@chakra-ui/react';
import { FaUserCircle } from 'react-icons/fa';

const Login = () => {
    const navigate = useNavigate();
    const { dispatch } = useUserState();

    const onSubmit = async (e) => {
        e.preventDefault();
        const userName = e.target[0].value;
        if (!userName) {
            return;
        }

        await userService
            .login(userName)
            .then((res) => {
                login(res.data[0], dispatch);
            })
            .catch((err) => {
                alert(err);
            });

        navigate('/tasks/all');
    };

    return (
        <Container>
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
                        Login
                    </Button>
                </Stack>
            </form>
        </Container>
    );
};

export default Login;
