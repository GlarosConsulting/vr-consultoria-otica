import React from 'react';
import { useMemo } from 'react';
import { Image } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { DataTable } from 'react-native-paper';

import { useNavigation } from '@react-navigation/native';

import salesBySellerImg from '../../assets/sales-by-seller.png';
import Header from '../../components/Header';
import { useMaximizedChart } from '../../hooks/maximized-chart';
import IFormattedBilling from '../../interfaces/billings/IFormattedBilling';
import IFormattedComissionBySeller from '../../interfaces/sales/IFormattedComissionBySeller';
import comissionBySellersMock from '../../mocks/comission-by-sellers';
import mostSoldProductsMock from '../../mocks/most-sold-products';
import formatRealValue from '../../utils/formatRealValue';

import {
  Container,
  ContactButtonContainer,
  ContactButtonText,
  InfoCard,
  InfoCardTitle,
  TouchableInfoCard,
} from './styles';

const Financial: React.FC = () => {
  const { navigate } = useNavigation();

  const {
    setMaximizedChartContent,
    navigateToMaximizedChart,
  } = useMaximizedChart();

  const mostSoldProductsFormatted: IFormattedBilling[] = useMemo(
    () =>
      mostSoldProductsMock.map<IFormattedBilling>(bill => ({
        name: bill.name,
        value: formatRealValue(bill.value),
      })),
    [mostSoldProductsMock],
  );
  const comissionBySellersFormatted: IFormattedComissionBySeller[] = useMemo(
    () =>
      comissionBySellersMock.map<IFormattedComissionBySeller>(comission => ({
        name: comission.name,
        month: formatRealValue(comission.month),
        twelve_months: formatRealValue(comission.twelve_months),
      })),
    [comissionBySellersMock],
  );

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
                <InfoCardTitle>Vendas por vendedor</InfoCardTitle>

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
          <InfoCardTitle>Vendas por vendedor</InfoCardTitle>

          <Image
            style={{ width: '100%', height: 132 }}
            source={salesBySellerImg}
          />
        </TouchableInfoCard>

        <InfoCard style={{ marginTop: 16 }}>
          <InfoCardTitle>Produtos mais vendidos</InfoCardTitle>

          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Nome</DataTable.Title>
              <DataTable.Title numeric>Valor</DataTable.Title>
            </DataTable.Header>

            {mostSoldProductsFormatted.map(bill => (
              <DataTable.Row key={bill.name}>
                <DataTable.Cell>{bill.name}</DataTable.Cell>
                <DataTable.Cell numeric>{bill.value}</DataTable.Cell>
              </DataTable.Row>
            ))}
          </DataTable>
        </InfoCard>

        <InfoCard style={{ marginTop: 16 }}>
          <InfoCardTitle>Comissão por vendedor</InfoCardTitle>

          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Funcionário</DataTable.Title>
              <DataTable.Title numeric>Fev - 2021</DataTable.Title>
              <DataTable.Title numeric>12 meses</DataTable.Title>
            </DataTable.Header>

            {comissionBySellersFormatted.map(comission => (
              <DataTable.Row key={comission.name}>
                <DataTable.Cell>{comission.name}</DataTable.Cell>
                <DataTable.Cell numeric>{comission.month}</DataTable.Cell>
                <DataTable.Cell numeric>
                  {comission.twelve_months}
                </DataTable.Cell>
              </DataTable.Row>
            ))}
          </DataTable>
        </InfoCard>
      </Container>

      <ContactButtonContainer activeOpacity={0.6}>
        <ContactButtonText>Contato</ContactButtonText>
      </ContactButtonContainer>
    </>
  );
};
export default Financial;
