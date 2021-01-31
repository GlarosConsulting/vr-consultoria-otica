import React from 'react';

import Header from '../../components/Header';

import { Container, ContactButtonContainer, ContactButtonText } from './styles';

const Home: React.FC = () => (
  <>
    <Header />

    <Container>
      <ContactButtonContainer activeOpacity={0.6}>
        <ContactButtonText>Contato</ContactButtonText>
      </ContactButtonContainer>
    </Container>
  </>
);

export default Home;
