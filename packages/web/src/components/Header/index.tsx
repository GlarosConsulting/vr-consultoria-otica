import React from 'react';

import { Image } from '@chakra-ui/core';

import { Container } from './styles';

const Header: React.FC = () => (
  <Container width="100%" padding={6}>
    <Image src="logo_brasil_car.png"></Image>
  </Container>
);

export default Header;
