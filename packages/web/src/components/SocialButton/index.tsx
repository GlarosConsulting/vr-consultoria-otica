import React from 'react';
import { FaGoogle } from 'react-icons/fa';

import { Button, ButtonProps, Flex, Text } from '@chakra-ui/core';

interface ISocialButtonProps extends ButtonProps {
  btnType: 'google';
  color: string;
  backgroundColor: string;
}

const SocialButton: React.FC<ISocialButtonProps> = ({
  btnType,
  color,
  backgroundColor,
  children,
  ...rest
}) => {
  const bgColor = backgroundColor;

  return (
    <Button
      marginBottom={3}
      width="100%"
      padding={3}
      borderRadius="md"
      backgroundColor={bgColor}
      {...rest}
    >
      <Flex width={30} justifyContent="center" alignItems="center">
        {btnType === 'google' && (
          <FaGoogle style={{ fontWeight: 'bold' }} size={22} color={color} />
        )}
      </Flex>
      <Flex flex={1} justifyContent="center" alignItems="center">
        <Text fontSize={18} fontWeight="bold">
          {children}
        </Text>
      </Flex>
    </Button>
  );
};

export default SocialButton;
