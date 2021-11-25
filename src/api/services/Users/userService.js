import axiosInstance from '../../axios';

export async function login(user) {
    try {
        const res = await axiosInstance().get(`/users?name=${user}`);
        const userData = res.data[0];
        if (userData && userData.name === user) {
            return res;
        } else {
            throw Error('Invalid username');
        }
    } catch (err) {
        throw err;
    }
}

export async function register(userName) {
    const newUser = {
        name: userName,
        isAdmin: false,
    };
    return axiosInstance()
        .get(`/users?name=${userName}`)
        .then(async (res) => {
            const userData = res.data[0];
            if (userData && userData.name === userName) {
                throw Error('Username already exists!');
            }
            return axiosInstance().post('/users', newUser);
        })
        .catch((err) => {
            throw err;
        });
}
