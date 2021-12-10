import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import ModalWrapper from '../common/ModalWrapper';
import AddTask from './AddTask';

const AddTaskModal = ({ onCloseToggle, buttonSize, buttonText }) => {
    const [closeModal, setCloseModal] = useState(true);

    const onCloseModal = () => {
        console.log('cancel 3');
        if (onCloseToggle) onCloseToggle();
        setCloseModal(!closeModal);
    };
    console.log('closeModal component', closeModal);
    return (
        <ModalWrapper
            buttonIcon={<FaPlus style={{ color: 'tomato' }} size={buttonSize ? buttonSize : 40} />}
            buttonText={buttonText ? buttonText : ' NEW TASK'}
            buttonType="variant"
            onCloseModal={closeModal}
            modalHeader=""
            data-testid="addTaskSvg"
        >
            <AddTask onCancel={onCloseModal} />
        </ModalWrapper>
    );
};

export default AddTaskModal;
