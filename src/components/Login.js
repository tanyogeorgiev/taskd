import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import Button from './Button';
import login from '../context/user/actions/login';
import register from '../context/user/actions/register';
import { useUserState } from '../context/user/UserProvider';
import * as userService from '../api/services/Users';

const Login = ({ type }) => {
    const currentLocation = useLocation();
    const [userName, setUserName] = useState('');
    const navigate = useNavigate();
    const { dispatch } = useUserState();

    const onSubmit = async (e) => {
        e.preventDefault();

        if (!userName) {
            return;
        }

        if (type === 'login') {
            await userService
                .login(userName)
                .then((res) => {
                    login(res.data[0], dispatch);
                    navigate('/');
                })
                .catch((err) => {
                    alert(err);
                });
        }

        if (type === 'register') {
            register(userName)(dispatch).catch((err) => {
                alert(err);
            });
        }
    };

    return (
        <div>
            <>
                <form className="add-form" onSubmit={onSubmit}>
                    <div className="form-control">
                        <label>Username</label>
                        <input
                            type="text"
                            placeholder="Enter Username"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                        />

                        <input
                            type="submit"
                            value={currentLocation.pathname === '/login' ? 'Login' : 'Register'}
                            className="btn "
                        />
                        <Link to="/">
                            <Button color="red" text="Cancel" />
                        </Link>
                    </div>
                </form>
            </>
        </div>
    );
};

export default Login;
