import { render, screen } from '@testing-library/react';
import Task from '../components/task/Task';

const task = {
    text: 'Task test',
    day: '2021-12-16T15:59',
    reminder: true,
    imgUrl: '',
    orderId: 9007199254740991,
    priority: '3',
    userId: 1,
    imgUrlWidth: '',
    id: 1,
};

const formatedDay = new Intl.DateTimeFormat('en-US', {
    dateStyle: 'full',
    timeStyle: 'long',
}).format(new Date(task.day));

it('task text is visible', () => {
    render(<Task task={task} />);
    expect(screen.getByText(task.text)).toBeInTheDocument();
});

it('task day is visible', () => {
    render(<Task task={task} />);
    expect(screen.getByText(formatedDay)).toBeInTheDocument();
});

it('delete button is visible', () => {
    render(<Task task={task} />);
    expect(screen.getByTestId('deleteTaskSvg')).toBeInTheDocument();
});

it('edit button is visible', () => {
    render(<Task task={task} />);
    expect(screen.getByTestId('editTaskSvg')).toBeInTheDocument();
});
