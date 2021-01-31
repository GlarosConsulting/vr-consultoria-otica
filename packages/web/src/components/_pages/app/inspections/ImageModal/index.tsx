import React from 'react';

import {
  Modal,
  ModalOverlay,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  Box,
  Image,
} from '@chakra-ui/core';

import IFormattedInspection from '@/interfaces/inspections/IFormattedInspection';

interface IImageModalProps {
  isOpen: boolean;
  inspection?: IFormattedInspection;
  onClose?: (
    event: React.MouseEvent | React.KeyboardEvent,
    reason?: 'pressedEscape' | 'clickedOverlay',
  ) => void;
  id?: string;
  image_url: string | null;
}

const ImageModal: React.FC<IImageModalProps> = ({
  isOpen,
  image_url,
  id,
  onClose,
}) => (
  <>
    {image_url && (
      <Modal size="full" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />

        <ModalContent borderRadius="md">
          <ModalCloseButton />

          <ModalBody paddingBottom={4}>
            <Box
              margin="auto"
              width="calc(100% - 60vw)"
              id={id || ''}
              position="relative"
              borderRadius="md"
              overflow="hidden"
              cursor="pointer"
            >
              <Image src={image_url} />
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    )}
  </>
);

export default ImageModal;
