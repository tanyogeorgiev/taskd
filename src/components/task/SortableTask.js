import { debounce } from 'lodash';
import { useMemo } from 'react';
import {
    FaSearch,
    FaSortAlphaDown,
    FaSortAlphaDownAlt,
    FaSortAmountDown,
    FaSortAmountDownAlt,
    FaSortNumericDown,
    FaSortNumericDownAlt,
    FaStar,
    FaSort,
    FaCheckDouble,
} from 'react-icons/fa';
import searchTasks from '../../context/task/actions/searchTask';
import { useTaskState } from '../../context/task/TaskProvider';
import * as taskService from '../../api/services/Tasks';
import compareValues from '../../helper/compareValues';
import reorderTask from '../../context/task/actions/reorderTasks';
import { useUserState } from '../../context/user/UserProvider';
import {
    Menu,
    MenuButton,
    MenuItem,
    MenuDivider,
    MenuList,
    Button,
    MenuGroup,
    Stack,
    Input,
    InputGroup,
    InputLeftElement,
} from '@chakra-ui/react';

const SortableTasks = ({ children }) => {
    const { tasks, dispatch } = useTaskState();
    const { user } = useUserState();
    const debouncedSearch = useMemo(() => {
        const onSearchChange = (e) => {
            taskService.search(e.target.value, user.data.id).then((res) => {
                searchTasks(res.data, dispatch);
            });
        };

        return debounce(onSearchChange, 300);
    }, [dispatch, user.data.id]);

    const onCustomOrder = () => {
        const newOrder = tasks.sort((a, b) => {
            return (
                localStorage.getItem(`order_${user.data.id}_${a.id}`) -
                localStorage.getItem(`order_${user.data.id}_${b.id}`)
            );
        });
        reorderTask(newOrder, dispatch);
    };

    const onCustomOrderFinished = (finished) => {
        const newOrder = tasks.sort((a, b) => {
            return finished ? b.reminder - a.reminder : a.reminder - b.reminder;
        });
        reorderTask(newOrder, dispatch);
    };
    const onSortTaskAsc = (sortKey) => {
        const newOrder = tasks.sort(compareValues(sortKey, 'ASC'));

        newOrder.map((task, i) => {
            localStorage.setItem(`order_${task.id}`, i);
            return { ...task, orderId: i };
        });
        reorderTask(newOrder, dispatch);
    };
    const onSortTaskDesc = (sortKey) => {
        const newOrder = tasks.sort(compareValues(sortKey, 'DESC'));

        newOrder.map((task, i) => {
            localStorage.setItem(`order_${task.id}`, i);
            return { ...task, orderId: i };
        });
        reorderTask(newOrder, dispatch);
    };
    return (
        <>
            <Stack isInline={true} justifyContent="center" pb="10px">
                <InputGroup style={{ width: '300px' }}>
                    <InputLeftElement
                        pointerEvents="none"
                        children={<FaSearch size={20} style={{ color: 'tomato' }} />}
                    />
                    <Input
                        disabled={tasks?.length === 0}
                        placeholder="SEARCH TASK"
                        label="Search Tasks"
                        onChange={debouncedSearch}
                    />
                </InputGroup>
                <Menu closeOnSelect={false}>
                    <MenuButton
                        as={Button}
                        disabled={tasks?.length === 0}
                        colorScheme="gray"
                        rightIcon={<FaSort />}
                    >
                        ORDER BY
                    </MenuButton>
                    <MenuList minWidth="240px">
                        <MenuGroup title="Custom">
                            <MenuItem
                                onClick={() => {
                                    onCustomOrder();
                                }}
                                icon={
                                    <FaStar
                                        size={20}
                                        style={{
                                            color: 'lightpink',
                                            cursor: 'pointer',
                                        }}
                                    />
                                }
                            >
                                Your own order
                            </MenuItem>
                            <MenuItem
                                onClick={() => {
                                    onCustomOrderFinished(false);
                                }}
                                icon={
                                    <FaCheckDouble
                                        size={20}
                                        style={{
                                            color: 'tomato',
                                            cursor: 'pointer',
                                        }}
                                    />
                                }
                            >
                                Unfinished
                            </MenuItem>
                            <MenuItem
                                onClick={() => {
                                    onCustomOrderFinished(true);
                                }}
                                icon={
                                    <FaCheckDouble
                                        size={20}
                                        style={{
                                            color: 'mediumaquamarine',
                                            cursor: 'pointer',
                                        }}
                                    />
                                }
                            >
                                Finished
                            </MenuItem>
                        </MenuGroup>
                        <MenuDivider />
                        <MenuGroup title="Title">
                            <MenuItem
                                onClick={() => {
                                    onSortTaskAsc('text');
                                }}
                                icon={
                                    <FaSortAlphaDown
                                        size={20}
                                        style={{
                                            color: 'tomato',
                                            cursor: 'pointer',
                                        }}
                                    />
                                }
                            >
                                Ascending
                            </MenuItem>
                            <MenuItem
                                onClick={() => {
                                    onSortTaskDesc('text');
                                }}
                                icon={
                                    <FaSortAlphaDownAlt
                                        size={20}
                                        onClick={() => {
                                            onSortTaskDesc('text');
                                        }}
                                        style={{
                                            color: true ? 'lightblue' : 'tomato',
                                            cursor: 'pointer',
                                        }}
                                    />
                                }
                            >
                                Descending
                            </MenuItem>
                        </MenuGroup>
                        <MenuDivider />
                        <MenuGroup title="Day">
                            <MenuItem
                                onClick={() => {
                                    onSortTaskAsc('day');
                                }}
                                icon={
                                    <FaSortNumericDown
                                        size={20}
                                        style={{
                                            color: 'tomato',
                                            cursor: 'pointer',
                                        }}
                                    />
                                }
                            >
                                Ascending
                            </MenuItem>
                            <MenuItem
                                onClick={() => {
                                    onSortTaskDesc('day');
                                }}
                                icon={
                                    <FaSortNumericDownAlt
                                        size={20}
                                        style={{
                                            color: 'lightblue',
                                            cursor: 'pointer',
                                        }}
                                    />
                                }
                            >
                                Descending
                            </MenuItem>
                        </MenuGroup>
                        <MenuDivider />
                        <MenuGroup title="Priority">
                            <MenuItem
                                icon={
                                    <FaSortAmountDownAlt
                                        size={20}
                                        style={{ color: 'tomato', cursor: 'pointer' }}
                                    ></FaSortAmountDownAlt>
                                }
                                onClick={() => {
                                    onSortTaskAsc('priority');
                                }}
                            >
                                Ascending
                            </MenuItem>
                        </MenuGroup>
                        <MenuItem
                            icon={
                                <FaSortAmountDown
                                    size={20}
                                    style={{ color: 'lightblue', cursor: 'pointer' }}
                                ></FaSortAmountDown>
                            }
                            onClick={() => {
                                onSortTaskDesc('priority');
                            }}
                        >
                            Descending
                        </MenuItem>
                    </MenuList>
                </Menu>
            </Stack>
            {children}
        </>
    );
};

export default SortableTasks;
