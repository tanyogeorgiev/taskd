import { Route, Routes } from 'react-router-dom';
import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import Layout from './components/Layout';

function App() {
    return (
        <ChakraProvider>
            <Routes>
                <Route path="/*" element={<Layout />} />
            </Routes>
        </ChakraProvider>
    );
}

export default App;
