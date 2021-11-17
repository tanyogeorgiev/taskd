import '../App.css';
import React from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { useUserState } from '../context/user/UserProvider';
import logout from '../context/user/actions/logout';
import { useTaskState } from '../context/task/TaskProvider';
import DarkModeToggle from './DarkModeToggle';

const Header = ({ title }) => {
    const location = useLocation();
    const { user, removeUser } = useUserState();
    const isAuthorized = user.data.id;
    const { dispatch } = useTaskState();

    const logoutUser = () => {
        removeUser();
        logout()(dispatch);
    };

    return (
        <header className="header">
            <div>
                <h1>{title}</h1>
            </div>
            <p> Hello {user.data.name ? user.data.name : 'Guest'}</p>

            <ul>
                {location.pathname === '/' && isAuthorized && (
                    <li>
                        <Link to="/addtask">Add Task</Link>
                    </li>
                )}
                {!isAuthorized && (
                    <>
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                        <li>
                            <Link to="/register">Register</Link>
                        </li>
                    </>
                )}
                {isAuthorized && (
                    <li>
                        <Link to="/" onClick={logoutUser}>
                            Logout
                        </Link>
                    </li>
                )}
                <li>
                    <Link to="/about"> About </Link>
                </li>
            </ul>
            <DarkModeToggle />
        </header>
    );
};

Header.defaultProps = {
    title: 'TASKD',
};

Header.propTypes = {
    title: PropTypes.string.isRequired,
};

export default Header;
