import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
} from "@chakra-ui/react";

interface ModalComponentProps {
  title: string;
  description: string;
  isOpen: boolean;
  onClose: () => void;
  hasSecondaryButton?: boolean;
  callback?: () => void;
}

const ModalComponent = ({
  title,
  description,
  isOpen,
  onClose,
  hasSecondaryButton,
  callback,
}: ModalComponentProps) => {
  return (
    <>
      <Modal scrollBehavior={"inside"} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>{title}</ModalHeader>
            <ModalBody>{description}</ModalBody>
            <ModalFooter>
              <Button
                _hover={{}}
                bg="blue.200"
                color="white"
                onClick={onClose}
                mr="20px"
              >
                Fechar
              </Button>
              {hasSecondaryButton === true ? (
                <Button
                  color="white"
                  bg="red.500"
                  onClick={callback}
                  borderColor="red.500"
                  _hover={{}}
                >
                  Não participar
                </Button>
              ) : undefined}
            </ModalFooter>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </>
  );
};

export default ModalComponent;
