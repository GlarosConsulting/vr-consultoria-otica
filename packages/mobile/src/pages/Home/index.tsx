import React from 'react';
import { Dimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

import Header from '../../components/Header';

import { Container, ContactButtonContainer, ContactButtonText } from './styles';

const Home: React.FC = () => (
  <>
    <Header />

    <Container>
      <BarChart
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
      />
    </Container>

    <ContactButtonContainer activeOpacity={0.6}>
      <ContactButtonText>Contato</ContactButtonText>
    </ContactButtonContainer>
  </>
);

export default Home;
