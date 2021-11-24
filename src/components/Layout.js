import { Routes, Route, Outlet } from 'react-router-dom';
import About from './About';
import Footer from './Footer';
import Header from './Header';
import Login from './Login';
import TaskPage from './task/TaskPage';

const Layout = () => {
    return (
        <>
            <Routes>
                <Route path="login" element={<Login type="login" />} />
                <Route path="about" element={<About />} />
                <Route path="register" element={<Login type="register" />} />/
                <Route path="tasks/*" element={<TaskPage />} />
            </Routes>
            <Header />
            <Footer />
        </>
    );
};

export default Layout;
