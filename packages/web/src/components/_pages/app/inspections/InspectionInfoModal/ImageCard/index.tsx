import React, { useCallback, useState } from 'react';

import { Box, Flex, Image, useTheme } from '@chakra-ui/core';
import { transparentize } from 'polished';

import ImageModal from '../../ImageModal';

interface IImageCardProps {
  id?: string;
  title: string;
  image_url: string | null;
}

const ImageCard: React.FC<IImageCardProps> = ({ id, title, image_url }) => {
  const theme = useTheme();
  const [openImageModal, setOpenImageModal] = useState<string>();

  const handleOpenImage = useCallback((url: string) => {
    setOpenImageModal(url);
  }, []);

  const handleCloseImageModal = useCallback(async () => {
    setOpenImageModal(undefined);
  }, []);

  return (
    <>
      {image_url && (
        <Box
          width="100%"
          maxWidth={600}
          id={id || ''}
          position="relative"
          borderRadius="md"
          overflow="hidden"
          cursor="pointer"
          onClick={() => handleOpenImage(image_url)}
        >
          <Image src={image_url} />

          <Flex
            position="absolute"
            bottom={0}
            justifyContent="center"
            alignItems="center"
            bg={transparentize(0.25, theme.colors.white)}
            width="100%"
          >
            {title}
          </Flex>

          <ImageModal
            isOpen={!!openImageModal}
            onClose={handleCloseImageModal}
            image_url={image_url}
          />
        </Box>
      )}
    </>
  );
};

export default ImageCard;
