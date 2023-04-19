import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Stack,
    useDisclosure,
} from "@chakra-ui/react";
import { memo, VFC } from "react";
type Props = { isOpen: boolean; onClose: () => void };

export const ModalTest: VFC<Props> = memo((props) => {
    const { isOpen, onClose } = props;
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>新規食材追加</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Stack></Stack>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
});
