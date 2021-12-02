import { useDrag, useDrop } from 'react-dnd';
import { useMemo, useRef } from 'react';
import update from 'immutability-helper';
import { ItemTypes } from '../../constants/itemTypes';
import reorderTask from '../../context/task/actions/reorderTasks';
import { useTaskState } from '../../context/task/TaskProvider';
import { debounce } from 'lodash';
import { useUserState } from '../../context/user/UserProvider';

const DraggableTask = ({ children }) => {
    const { tasks, dispatch } = useTaskState();
    //dnd
    const { user } = useUserState();
    const ref = useRef(null);
    const [{ handlerId }, drop] = useDrop({
        accept: ItemTypes.TASK,
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            };
        },
        hover(item, monitor) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = children.props.index;
            // Don't replace items with themselves
            if (dragIndex === hoverIndex) {
                return;
            }
            // Determine rectangle on screen
            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            // Get vertical middle
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            // Determine mouse position
            const clientOffset = monitor.getClientOffset();
            // Get pixels to the top
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;
            // Only perform the move when the mouse has crossed half of the items height
            // When dragging downwards, only move when the cursor is below 50%
            // When dragging upwards, only move when the cursor is above 50%
            // Dragging downwards
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            // Dragging upwards
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }
            // Time to actually perform the action
            moveTask(dragIndex, hoverIndex);
            // Note: we're mutating the monitor item here!
            // Generally it's better to avoid mutations,
            // but it's good here for the sake of performance
            // to avoid expensive index searches.
            item.index = hoverIndex;
        },
    });

    const moveTask = useMemo(() => {
        const moveCardDebounce = (dragIndex, hoverIndex) => {
            const dragTask = tasks[dragIndex];
            const newOrder = update(tasks, {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, dragTask],
                ],
            });

            newOrder.map((task, i) => {
                localStorage.setItem(`order_${user.data.id}_${task.id}`, i);
                return { ...task, orderId: i };
            });

            reorderTask(newOrder, dispatch);
        };

        return debounce(moveCardDebounce, 1);
    }, [tasks, dispatch, user.data.id]);

    const [{ isDragging }, drag] = useDrag({
        type: ItemTypes.TASK,
        item: () => {
            return { id: children.props.task.id, index: children.props.index };
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    drag(drop(ref));
    return (
        <div
            ref={ref}
            style={{ opacity: isDragging ? 0 : 1, cursor: 'pointer' }}
            data-handler-id={handlerId}
        >
            {children}
        </div>
    );
};

export default DraggableTask;
