import React from 'react';
import { Image } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

import { useNavigation } from '@react-navigation/native';

import financialChartImg from '../../assets/financial-chart.png';
import salesBySellerImg from '../../assets/sales-by-seller.png';
import Header from '../../components/Header';
import { useMaximizedChart } from '../../hooks/maximized-chart';

import {
  Container,
  TouchableInfoCard,
  InfoCard,
  InfoCardTitle,
  ContactButtonContainer,
  ContactButtonText,
} from './styles';

const Home: React.FC = () => {
  const { navigate } = useNavigation();

  const {
    setMaximizedChartContent,
    navigateToMaximizedChart,
  } = useMaximizedChart();

  return (
    <>
      <Header />

      <Container
        contentContainerStyle={{ paddingBottom: getStatusBarHeight() + 96 }}
      >
        <TouchableInfoCard
          activeOpacity={0.7}
          onPress={() => {
            setMaximizedChartContent(
              <InfoCard
                style={{
                  marginTop: 16,
                  height: '100%',
                }}
              >
                <InfoCardTitle>Fluxo de caixa</InfoCardTitle>

                <Image
                  style={{ width: '100%', height: 448, resizeMode: 'stretch' }}
                  source={financialChartImg}
                />
              </InfoCard>,
            );

            navigateToMaximizedChart(navigate);
          }}
          style={{
            marginTop: 16,
          }}
        >
          <InfoCardTitle>Fluxo de caixa</InfoCardTitle>

          <Image
            style={{ width: '100%', height: 200 }}
            source={financialChartImg}
          />
        </TouchableInfoCard>

        <TouchableInfoCard
          activeOpacity={0.7}
          onPress={() => {
            setMaximizedChartContent(
              <InfoCard
                style={{
                  marginTop: 16,
                  height: '100%',
                }}
              >
                <InfoCardTitle>
                  Performance de vendas por vendedor
                </InfoCardTitle>

                <Image
                  style={{ width: '100%', height: 288, resizeMode: 'stretch' }}
                  source={salesBySellerImg}
                />
              </InfoCard>,
            );

            navigateToMaximizedChart(navigate);
          }}
          style={{
            marginTop: 16,
          }}
        >
          <InfoCardTitle>Performance de vendas por vendedor</InfoCardTitle>

          <Image
            style={{ width: '100%', height: 132 }}
            source={salesBySellerImg}
          />
        </TouchableInfoCard>
      </Container>

      <ContactButtonContainer activeOpacity={0.6}>
        <ContactButtonText>Contato</ContactButtonText>
      </ContactButtonContainer>
    </>
  );
};

export default Home;
