import { Routes, Route, Outlet } from 'react-router-dom';
import About from './About';
import Footer from './Footer';
import Header from './Header';
import Login from '../components/auth/Login';
import TaskPage from './task/TaskPage';
import Register from './auth/Register';

const Layout = () => {
    return (
        <>
            <Routes>
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />/
                <Route path="about" element={<About />} />
                <Route path="tasks/*" element={<TaskPage />} />
            </Routes>
            <Header />
            <Outlet />
            <Footer />
        </>
    );
};

export default Layout;
