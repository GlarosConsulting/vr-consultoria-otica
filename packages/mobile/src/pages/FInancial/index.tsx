import React from 'react';
import { useMemo } from 'react';
import { DataTable } from 'react-native-paper';

import Header from '../../components/Header';
import { IFormattedBilliing } from '../../interfaces/billings';
import billsToPay from '../../mocks/bills-to-pay';
import billsToReceive from '../../mocks/bills-to-receive';
import formatRealValue from '../../utils/formatRealValue';

import {
  Container,
  ContactButtonContainer,
  ContactButtonText,
  TableCard,
  TableCardTitle,
} from './styles';

const Financial: React.FC = () => {
  const formattedBillsToPay: IFormattedBilliing[] = useMemo(
    () =>
      billsToPay.map<IFormattedBilliing>(bill => ({
        name: bill.name,
        value: formatRealValue(bill.value),
      })),
    [billsToPay],
  );

  const formattedBillsToReceive: IFormattedBilliing[] = useMemo(
    () =>
      billsToReceive.map<IFormattedBilliing>(bill => ({
        name: bill.name,
        value: formatRealValue(bill.value),
      })),
    [billsToReceive],
  );

  return (
    <>
      <Header />

      <Container>
        <TableCard>
          <TableCardTitle>Contas a pagar</TableCardTitle>
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
        </TableCard>

        <TableCard style={{ marginTop: 6 }}>
          <TableCardTitle>Contas a receber</TableCardTitle>
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
        </TableCard>
      </Container>

      <ContactButtonContainer activeOpacity={0.6}>
        <ContactButtonText>Contato</ContactButtonText>
      </ContactButtonContainer>
    </>
  );
};
export default Financial;
