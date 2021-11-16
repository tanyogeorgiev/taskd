import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import Button from './Button';
import login from '../context/user/actions/login';
import register from '../context/user/actions/register';
import { useUserState } from '../context/user/UserProvider';

const Login = ({ type }) => {
    const currentLocation = useLocation();
    const [userName, setUserName] = useState('');
    const navigate = useNavigate();
    const { dispatch } = useUserState();

    const onSubmit = (e) => {
        e.preventDefault();

        if (!userName) {
            return;
        }

        if (type === 'login') {
            login(userName)(dispatch);
        }

        if (type === 'register') {
            register(userName)(dispatch);
        }

        setUserName('');
        navigate('/');
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
                    </div>
                    <input
                        type="submit"
                        value={currentLocation.pathname === '/login' ? 'Login' : 'Register'}
                        className="btn "
                    />
                    <Link to="/">
                        <Button color="red" text="Cancel">
                            Close
                        </Button>
                    </Link>
                </form>
            </>
        </div>
    );
};

export default Login;
