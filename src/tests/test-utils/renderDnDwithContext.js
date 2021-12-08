import { render } from '@testing-library/react';
import { TaskProvider, UserProvider } from '../../context';

const renderTaskWithContext = (ui, { userInitialState, taskInitialState, ...renderOptions }) => {
    const Wrapper = ({ children }) => (
        <UserProvider value={userInitialState}>
            <TaskProvider value={taskInitialState}>{children}</TaskProvider>
        </UserProvider>
    );

    return render(ui, { wrapper: Wrapper, ...renderOptions });
};

export default renderTaskWithContext;
