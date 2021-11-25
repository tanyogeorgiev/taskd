import { useNavigate } from 'react-router-dom';
import register from '../../context/user/actions/register';
import { useUserState } from '../../context/user/UserProvider';
import * as userService from '../../api/services/Users';
import TextInput from '../common/TextInput';
import SubmitInput from '../common/SubmitInput';

const Register = () => {
    const navigate = useNavigate();
    const { dispatch } = useUserState();

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
            })
            .catch((err) => {
                alert(err);
            });

        navigate('/tasks/all');
    };

    return (
        <div>
            <>
                <form className="add-form" onSubmit={onSubmit}>
                    <div className="form-control">
                        <TextInput placeholder="Enter username" label="Username" />

                        <SubmitInput type="submit" value="Register" className="btn " />
                    </div>
                </form>
            </>
        </div>
    );
};

export default Register;
