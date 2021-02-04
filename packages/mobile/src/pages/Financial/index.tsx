import React from 'react';
import { useMemo } from 'react';
import { Image } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { DataTable } from 'react-native-paper';

import financialChartImg from '../../assets/financial-chart.png';
import Header from '../../components/Header';
import IFormattedBilling from '../../interfaces/billings/IFormattedBilling';
import billsToPay from '../../mocks/bills-to-pay';
import billsToReceive from '../../mocks/bills-to-receive';
import formatRealValue from '../../utils/formatRealValue';

import {
  Container,
  ContactButtonContainer,
  ContactButtonText,
  InfoCard,
  InfoCardTitle,
} from './styles';

const Financial: React.FC = () => {
  const formattedBillsToPay: IFormattedBilling[] = useMemo(
    () =>
      billsToPay.map<IFormattedBilling>(bill => ({
        name: bill.name,
        value: formatRealValue(bill.value),
      })),
    [billsToPay],
  );

  const formattedBillsToReceive: IFormattedBilling[] = useMemo(
    () =>
      billsToReceive.map<IFormattedBilling>(bill => ({
        name: bill.name,
        value: formatRealValue(bill.value),
      })),
    [billsToReceive],
  );

  return (
    <>
      <Header />

      <Container
        contentContainerStyle={{ paddingBottom: getStatusBarHeight() + 96 }}
      >
        <InfoCard>
          <InfoCardTitle>Contas a pagar</InfoCardTitle>

          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Nome</DataTable.Title>
              <DataTable.Title numeric>Valor</DataTable.Title>
            </DataTable.Header>

            {formattedBillsToPay.map(bill => (
              <DataTable.Row key={bill.name}>
                <DataTable.Cell>{bill.name}</DataTable.Cell>
                <DataTable.Cell numeric>{bill.value}</DataTable.Cell>
              </DataTable.Row>
            ))}
          </DataTable>
        </InfoCard>

        <InfoCard style={{ marginTop: 16 }}>
          <InfoCardTitle>Contas a receber</InfoCardTitle>

          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Nome</DataTable.Title>
              <DataTable.Title numeric>Valor</DataTable.Title>
            </DataTable.Header>

            {formattedBillsToReceive.map(bill => (
              <DataTable.Row key={bill.name}>
                <DataTable.Cell>{bill.name}</DataTable.Cell>
                <DataTable.Cell numeric>{bill.value}</DataTable.Cell>
              </DataTable.Row>
            ))}
          </DataTable>
        </InfoCard>

        <InfoCard style={{ marginTop: 16 }}>
          <InfoCardTitle>Fluxo de caixa</InfoCardTitle>

          <Image
            style={{ width: '100%', height: 200 }}
            source={financialChartImg}
          />
        </InfoCard>
      </Container>

      <ContactButtonContainer activeOpacity={0.6}>
        <ContactButtonText>Contato</ContactButtonText>
      </ContactButtonContainer>
    </>
  );
};
export default Financial;
