import '../App.css';
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useUserState } from '../context/user/UserProvider';
import logout from '../context/user/actions/logout';
import { useTaskState } from '../context/task/TaskProvider';
import DarkModeToggle from './DarkModeToggle';
import { Flex, Text, Spacer, Heading } from '@chakra-ui/react';

const Header = ({ title }) => {
    const { user, removeUser } = useUserState();
    const isAuthorized = user.data.id;
    const { dispatch } = useTaskState();

    const logoutUser = () => {
        removeUser();
        logout(dispatch);
    };

    return (
        //<header className="header">
        <>
            <Flex
                as="header"
                wrap="nowrap"
                position="fixed"
                backgroundColor="rgb(26, 39, 48)"
                alignItems="center"
                justifyContent="space-between"
                w="100%"
                zIndex="999999"
            >
                <Flex alignItems="center">
                    <Text as="span" fontSize="4xl" color="cyan.600" pr={1}>
                        {title}
                    </Text>
                </Flex>
                <Flex alignItems="center">
                    {!isAuthorized && (
                        <>
                            <Link to="/login">
                                <Text as="span" color="cyan.600" pr={5}>
                                    LOGIN
                                </Text>
                            </Link>
                            <Spacer />
                            <Link to="/register">
                                <Text as="span" color="cyan.600" pr={5}>
                                    REGISTER
                                </Text>
                            </Link>
                            <Spacer />
                        </>
                    )}
                    {isAuthorized && (
                        <>
                            <Text as="span" fontSize="1xl" color="pink.50" pl={1} pr={5}>
                                Hello, {user.data.name ? user.data.name : 'Guest'}
                            </Text>
                            <Spacer />
                            <Link to="/" onClick={logoutUser}>
                                <Text as="span" color="cyan.600" pr={5}>
                                    LOGOUT
                                </Text>
                            </Link>
                            <Spacer />
                        </>
                    )}
                    <Link to="/about">
                        <Text as="span" color="cyan.600" pr={5}>
                            ABOUT
                        </Text>
                    </Link>
                    <Spacer />

                    <DarkModeToggle />
                </Flex>
            </Flex>
            {!isAuthorized && (
                <>
                    <Heading pt={10} as="h1" size="4xl" color="gray.600">
                        Wellcome to{' '}
                        <Text as="span" color="gray.700">
                            TASKD.
                        </Text>
                    </Heading>
                    <Text color="gray.400" fontSize="4xl" as="i">
                        Be more productive❤️
                    </Text>
                </>
            )}
        </>
    );
};

Header.defaultProps = {
    title: 'TASKD',
};

Header.propTypes = {
    title: PropTypes.string.isRequired,
};

export default Header;
