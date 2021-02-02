import React from 'react';

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

    <Container contentContainerStyle={{ paddingBottom: 96 }}>
      <InfoCard
        style={{
          marginTop: 16,
          minHeight: 196,
        }}
      >
        <InfoCardTitle>Fluxo de caixa</InfoCardTitle>
      </InfoCard>

      <InfoCard
        style={{
          marginTop: 16,
          minHeight: 340,
        }}
      >
        <InfoCardTitle>Performance de vendas por vendedor</InfoCardTitle>
      </InfoCard>

      {/* <BarChart
        data={{
          labels: ['January', 'February', 'March', 'April', 'May', 'June'],
          datasets: [
            {
              data: [20, 45, 28, 80, 99, 43],
            },
          ],
        }}
        width={Dimensions.get('screen').width - 32}
        height={220}
        yAxisLabel="$"
        chartConfig={{
          backgroundColor: '#777',
          backgroundGradientFrom: '#888',
          backgroundGradientTo: '#999',
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: '#999',
          },
        }}
        verticalLabelRotation={30}
        style={{
          borderRadius: 8,
        }}
      /> */}
    </Container>

    <ContactButtonContainer activeOpacity={0.6}>
      <ContactButtonText>Contato</ContactButtonText>
    </ContactButtonContainer>
  </>
);

export default Home;
