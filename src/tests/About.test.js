import About from '../components/About';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import Layout from '../components/Layout';

test('navigate to About page and get Version of App', () => {
    const history = createMemoryHistory();

    render(
        <Router location={history.location} navigator={history}>
            <Routes>
                <Route path="/*" element={<Layout />} />
                <Route path="/about" element={<About />} />
            </Routes>
        </Router>
    );

    const leftClick = { button: 0 };
    userEvent.click(screen.getByText(/about/i), leftClick);

    expect(screen.getByText(/version/i)).toBeInTheDocument();
});

test('Navigate to About page and all task link', () => {
    const history = createMemoryHistory();

    render(
        <Router location={history.location} navigator={history}>
            <Routes>
                <Route path="/*" element={<Layout />} />
                <Route path="/about" element={<About />} />
            </Routes>
        </Router>
    );

    const leftClick = { button: 0 };
    userEvent.click(screen.getByText(/about/i), leftClick);
    expect(screen.getByText(/view tasks/i).href).toBe('http://localhost/tasks/all');
});
