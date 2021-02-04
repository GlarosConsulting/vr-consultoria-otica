import React from 'react';
import { Image } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

import fluxoDeCaixaImg from '../../assets/financial-graph.png';
import salesBySeller from '../../assets/sales-by-seller.png';
import Header from '../../components/Header';

import {
  Container,
  InfoCard,
  InfoCardTitle,
  ContactButtonContainer,
  ContactButtonText,
} from './styles';

const Home: React.FC = () => (
  <>
    <Header />

    <Container
      contentContainerStyle={{ paddingBottom: getStatusBarHeight() + 96 }}
    >
      <InfoCard
        style={{
          marginTop: 16,
          minHeight: 196,
        }}
      >
        <InfoCardTitle>Fluxo de caixa</InfoCardTitle>

        <Image
          style={{ width: '100%', height: 200, marginTop: 22 }}
          source={fluxoDeCaixaImg}
        />
      </InfoCard>

      <InfoCard
        style={{
          marginTop: 16,
          minHeight: 340,
        }}
      >
        <InfoCardTitle>Performance de vendas por vendedor</InfoCardTitle>

        <Image
          style={{ width: '100%', height: 132, marginTop: 42 }}
          source={salesBySeller}
        />
      </InfoCard>
    </Container>

    <ContactButtonContainer activeOpacity={0.6}>
      <ContactButtonText>Contato</ContactButtonText>
    </ContactButtonContainer>
  </>
);

export default Home;
