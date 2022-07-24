import { useCallback } from 'react';

import {
  Text,
  Modal as ChakraModal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';

import { ModalProps } from '@global-components/Modal/types';

import { useModal } from '@global-stores/useModal';

export const Modal = ({ children, title }: ModalProps) => {
  const { isOpen, setOpenModal } = useModal();

  const close = useCallback(() => {
    setOpenModal(false);
  }, [setOpenModal]);

  return (
    <ChakraModal blockScrollOnMount={false} isOpen={isOpen} onClose={close}>
      <ModalOverlay />
      <ModalContent>
        {!!title && (
          <ModalHeader>
            <Text fontSize="lg" fontWeight="bold">
              {title}
            </Text>
          </ModalHeader>
        )}

        <ModalCloseButton />
        <ModalBody height="100%" padding="50px">
          {children}
        </ModalBody>
      </ModalContent>
    </ChakraModal>
  );
};
