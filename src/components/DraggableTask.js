import { useDrag, useDrop } from 'react-dnd';
import { ItemTypes } from '../constants/itemTypes';
import { useCallback, useRef } from 'react';
import reorderTask from '../context/task/actions/reorderTasks';
import update from 'immutability-helper';

import { useTaskState } from '../context/task/TaskProvider';

const DraggableTask = ({ children }) => {
    const { tasks, dispatch } = useTaskState();
    //dnd

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
            moveCard(dragIndex, hoverIndex);
            // Note: we're mutating the monitor item here!
            // Generally it's better to avoid mutations,
            // but it's good here for the sake of performance
            // to avoid expensive index searches.
            item.index = hoverIndex;
        },
    });

    const moveCard = useCallback(
        (dragIndex, hoverIndex) => {
            const dragCard = tasks[dragIndex];
            const newOrder = update(tasks, {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, dragCard],
                ],
            });
            reorderTask(newOrder)(dispatch);
        },
        [tasks]
    );

    const [{ isDragging }, drag] = useDrag({
        type: ItemTypes.TASK,
        item: () => {
            return { id: children.props.task.id, index: children.props.index };
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });
    const opacity = isDragging ? 0 : 1;
    drag(drop(ref));
    return (
        <div ref={ref} style={{ opacity }} data-handler-id={handlerId}>
            {children}
        </div>
    );
};

export default DraggableTask;
