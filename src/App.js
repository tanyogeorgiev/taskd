import { Route, Routes } from 'react-router-dom';
import React from 'react';
import ThemeProvider from './context/theme/ThemeProvider';
import { ChakraProvider } from '@chakra-ui/react';

import Layout from './components/Layout';

function App() {
    return (
        <ChakraProvider>
            <ThemeProvider>
                <Routes>
                    <Route
                        path="/*"
                        element={<Layout />} //<Navigate to="/login" />}
                    />
                </Routes>
            </ThemeProvider>
        </ChakraProvider>
    );
}

export default App;
