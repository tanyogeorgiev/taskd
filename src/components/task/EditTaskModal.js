import { useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import ModalWrapper from '../common/ModalWrapper';
import EditTask from './EditTask';

const EditTaskModal = ({ task }) => {
    const [closeModal, setCloseModal] = useState(false);

    const onClose = () => {
        setCloseModal(true);
    };

    return (
        <ModalWrapper
            buttonIcon={<FaEdit style={{ color: 'lightslategrey' }} size={30} />}
            buttonText=""
            buttonType="variant"
            onCloseModal={closeModal}
        >
            <EditTask onCancel={onClose} task={task} />
        </ModalWrapper>
    );
};

export default EditTaskModal;
