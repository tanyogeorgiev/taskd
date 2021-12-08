import { fireEvent, screen, waitFor } from '@testing-library/react';
import Tasks from '../components/task/Tasks';
import renderTaskWithContext from './test-utils/renderDnDwithContext';

const currentUser = {
    user: {
        loading: false,
        data: {
            name: 'tests',
            isAdmin: false,
            id: 9999,
        },
    },
};

it('render component without tasks', async () => {
    const tasks = {
        loading: false,
        tasks: [],
    };

    renderTaskWithContext(<Tasks />, {
        userInitialState: currentUser,
        taskInitialState: tasks,
    });

    await waitFor(() =>
        expect(screen.getByText(/Well... nobody's here. Add some stuff 💪/i)).toBeInTheDocument()
    );
    // expect(screen.getByText(/Well... nobody's here. Add some stuff 💪/i)).toBeInTheDocument();
});

it('render component with tasks', async () => {
    const tasks = {
        loading: false,
        tasks: [
            {
                text: 'A Task test title',
                day: '2021-12-16T15:15',
                reminder: false,
                imgUrl: '',
                orderId: 9007199254740991,
                priority: '2',
                userId: 9999,
                imgUrlWidth: '',
                id: 1,
            },
        ],
    };

    renderTaskWithContext(<Tasks />, {
        userInitialState: currentUser,
        taskInitialState: tasks,
    });

    await waitFor(() => {
        expect(screen.getByText(/a task test title/i)).toBeInTheDocument();
    });
});

describe('<Tasks/>', () => {
    let draggableTask;

    beforeEach(() => {
        const tasks = {
            loading: false,
            tasks: [
                {
                    text: 'A Task test title',
                    day: '2021-12-16T15:15',
                    reminder: false,
                    imgUrl: '',
                    orderId: 9007199254740991,
                    priority: '2',
                    userId: 9999,
                    imgUrlWidth: '',
                    id: 1,
                },
            ],
        };

        let task = renderTaskWithContext(<Tasks />, {
            userInitialState: currentUser,
            taskInitialState: tasks,
        });
        draggableTask = task.container.querySelector("div[draggable='true']");
    });

    it('opacity while drag task', async () => {
        await waitFor(() => expect(draggableTask.style.opacity).toBe('1'));
    });

    it('opacity while not drag task', async () => {
        fireEvent.dragStart(draggableTask);
        await waitFor(() => expect(draggableTask.style.opacity).toEqual('0'));
    });
});
