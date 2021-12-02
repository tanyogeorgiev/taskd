import { Routes, Route } from 'react-router-dom';
import About from './About';
import Footer from './Footer';
import Header from './Header';
import Login from '../components/auth/Login';
import TaskPage from './task/TaskPage';
import Register from './auth/Register';
import { Container } from '@chakra-ui/react';

const Layout = () => {
    return (
        <>
            <Header></Header>
            <Container as="main" pt={20} w="100%" maxW="90%">
                <Routes>
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />/
                    <Route path="about" element={<About />} />
                    <Route path="tasks/*" element={<TaskPage />} />
                </Routes>
            </Container>
            <Footer />
        </>
    );
};

export default Layout;
