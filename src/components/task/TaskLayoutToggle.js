import { Stack } from '@chakra-ui/react';
import { FaBorderAll, FaList } from 'react-icons/fa';
const TaskLayoutToggle = ({ onLayoutChange, cardLayout }) => {
    return (
        <Stack
            justifyContent="flex-end"
            isInline={true}
            width="200px"
            float="right"
            paddingRight="20px"
        >
            <FaList
                className="rightPadding"
                onClick={() => {
                    onLayoutChange(false);
                }}
                style={{
                    color: cardLayout ? 'lightblue' : 'tomato',
                    cursor: 'pointer',
                }}
                size={40}
            ></FaList>
            <FaBorderAll
                onClick={() => {
                    onLayoutChange(true);
                }}
                style={{
                    color: cardLayout ? 'tomato' : 'lightblue',
                    cursor: 'pointer',
                }}
                size={40}
            ></FaBorderAll>
        </Stack>
    );
};

export default TaskLayoutToggle;
