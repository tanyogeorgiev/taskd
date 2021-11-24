import { Route, Routes } from 'react-router-dom';
import React from 'react';
import ThemeProvider from './context/theme/ThemeProvider';
import Layout from './components/Layout';

function App() {
    return (
        <ThemeProvider>
            <div className="content">
                <Routes>
                    <Route
                        path="/*"
                        element={<Layout />} //<Navigate to="/login" />}
                    />
                </Routes>
            </div>
        </ThemeProvider>
    );
}

export default App;
