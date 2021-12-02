import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import ModalWrapper from '../common/ModalWrapper';
import AddTask from './AddTask';

const AddTaskModal = () => {
    const [closeModal, setCloseModal] = useState(true);

    const onCloseModal = () => {
        console.log('cancel 3');

        console.log(closeModal);
        setCloseModal(!closeModal);
    };
    console.log('closeModal component', closeModal);
    return (
        <ModalWrapper
            buttonIcon={<FaPlus style={{ color: 'tomato' }} size={40} />}
            buttonText="NEW TASK"
            buttonType="variant"
            onCloseModal={closeModal}
            modalHeader=""
        >
            <AddTask onCancel={onCloseModal} />
        </ModalWrapper>
    );
};

export default AddTaskModal;
