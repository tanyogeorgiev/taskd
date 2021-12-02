import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    useDisclosure,
    Button,
} from '@chakra-ui/react';
import { useEffect } from 'react';

const ModalWrapper = ({
    buttonType,
    buttonIcon,
    buttonText,
    onCloseModal,
    modalHeader,
    children,
}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => {
        onClose();
    }, [onCloseModal, onClose]);

    return (
        <>
            <Button variant={buttonType} leftIcon={buttonIcon} onClick={onOpen} size="md">
                {buttonText}
            </Button>
            <Modal onClose={onClose} isOpen={isOpen} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{modalHeader}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>{children}</ModalBody>
                    <ModalFooter>{/* <Button onClick={onClose}>Close</Button> */}</ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default ModalWrapper;
