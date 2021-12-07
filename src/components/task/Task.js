import { FaTimes, FaFireAlt, FaCheckDouble } from 'react-icons/fa';
import deleteTask from '../../context/task/actions/deleteTask';
import toggleReminder from '../../context/task/actions/toggleReminder';
import { useTaskState } from '../../context/task/TaskProvider';
import * as taskService from '../../api/services/Tasks';
import { Tag, Flex, Box, Text, IconButton, useColorModeValue } from '@chakra-ui/react';
import EditTaskModal from './EditTaskModal';

const Task = ({ task, draft }) => {
    const { dispatch } = useTaskState();

    const onToggleReminder = (id) => {
        taskService.toggleReminder(id).then((res) => {
            toggleReminder(res.data, dispatch);
        });
    };
    const formatedDay = task.day
        ? new Intl.DateTimeFormat('en-US', {
              dateStyle: 'full',
              timeStyle: 'long',
          }).format(new Date(task.day))
        : '';

    const priorityColor = () => {
        switch (task.priority) {
            case '1':
                return 'mediumaquamarine';
            case '2':
                return 'sandybrown';
            case '3':
                return 'tomato';
            default:
                return 'sandybrown';
        }
    };

    const onDeleteTask = (id) => {
        taskService.remove(id).then(() => {
            deleteTask(id, dispatch);
        });
    };

    return (
        <Box
            bg={useColorModeValue('gray.50', 'gray.700')}
            color={useColorModeValue('gray.700', 'gray.200')}
            rounded="md"
            boxShadow="base"
            p="5"
            className={`  ${task.reminder ? 'reminder' : ''} ${draft ? 'draft' : ''}`}
            onDoubleClick={() => onToggleReminder(task.id)}
        >
            <Box>{draft && <Tag>Draft</Tag>}</Box>

            <Flex justifyContent="space-between">
                <Flex alignItems="center">
                    {task.imgUrl && (
                        <img className="cardImg" src={task.imgUrl} alt="taskImage"></img>
                    )}

                    <IconButton
                        icon={
                            task.priority && (
                                <FaFireAlt
                                    size={30}
                                    className="rightPadding"
                                    style={{ color: priorityColor() }}
                                ></FaFireAlt>
                            )
                        }
                        variant="unstyled"
                    />
                    <IconButton
                        icon={task.reminder && <FaCheckDouble size={30} color="mediumaquamarine" />}
                        variant="unstyled"
                    />
                    <Text
                        fontSize="4xl"
                        // color="rgb(136 165 197)"
                        color={useColorModeValue('gray.600', 'gray.200')}
                    >
                        {task.text}
                    </Text>
                </Flex>
                <Flex wrap="nowrap" alignItems="center">
                    <EditTaskModal task={task} />
                    {/* <Link to={`/tasks/edit/${!draft ? task.id : ''}`} className="rightPadding">
                        <FaEdit style={{ color: 'lightslategrey' }} size={30} />
                    </Link> */}
                    {!draft && (
                        <FaTimes
                            style={{ color: 'tomato', cursor: 'pointer' }}
                            onClick={() => onDeleteTask(task.id)}
                            size={30}
                            data-testid="deleteTaskSvg"
                        />
                    )}
                </Flex>
            </Flex>
            <Box color={useColorModeValue('gray.600', 'gray.200')}>{formatedDay}</Box>
        </Box>
    );
};

export default Task;
