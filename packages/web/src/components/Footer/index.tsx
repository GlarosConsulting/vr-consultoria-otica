import React from 'react';

import { FlexProps } from '@chakra-ui/core';

import { Container } from './styles';

const Footer: React.FC<FlexProps> = ({ height }) => (
  <Container
    height={height}
    position="absolute"
    bottom="0"
    width="100%"
  ></Container>
);

export default Footer;
