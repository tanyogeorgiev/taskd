import Header from './components/Header';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import Footer from './components/Footer';
import About from './components/About';
import Login from './components/Login';
import { Route, Routes } from 'react-router-dom';
import { TaskProvider } from './context';
import React from 'react';

function App() {
    return (
        <React.StrictMode>
            <TaskProvider>
                <div className="container">
                    <Header></Header>
                    <Routes>
                        <Route path="/" exact element={<Tasks />} />
                        <Route path="/addtask" element={<AddTask />} />
                        <Route path="/addtask/:id" element={<AddTask />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/login" element={<Login type="login" />} />
                        <Route path="/register" element={<Login type="register" />} />
                    </Routes>
                    <Footer />
                </div>
            </TaskProvider>
        </React.StrictMode>
    );
}

export default App;
