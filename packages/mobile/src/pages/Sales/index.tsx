import React from 'react';
import { useMemo } from 'react';
import { DataTable } from 'react-native-paper';

import Header from '../../components/Header';
import IFormattedBilling from '../../interfaces/billings/IFormattedBilling';
import mostSoldProducts from '../../mocks/most-sold-products';
import formatRealValue from '../../utils/formatRealValue';

import {
  Container,
  ContactButtonContainer,
  ContactButtonText,
  TableCard,
  TableCardTitle,
} from './styles';

const Financial: React.FC = () => {
  const formattedMostSoldProducts: IFormattedBilling[] = useMemo(
    () =>
      mostSoldProducts.map<IFormattedBilling>(bill => ({
        name: bill.name,
        value: formatRealValue(bill.value),
      })),
    [mostSoldProducts],
  );

  return (
    <>
      <Header />

      <Container contentContainerStyle={{ paddingBottom: 96 }}>
        <TableCard style={{ minHeight: 156 }}>
          <TableCardTitle>Produtos mais vendidos</TableCardTitle>
        </TableCard>

        <TableCard style={{ marginTop: 16 }}>
          <TableCardTitle>Produtos mais vendidos</TableCardTitle>

          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Nome</DataTable.Title>
              <DataTable.Title numeric>Valor</DataTable.Title>
            </DataTable.Header>

            {formattedMostSoldProducts.map(bill => (
              <DataTable.Row key={bill.name}>
                <DataTable.Cell>{bill.name}</DataTable.Cell>
                <DataTable.Cell numeric>{bill.value}</DataTable.Cell>
              </DataTable.Row>
            ))}
          </DataTable>
        </TableCard>

        <TableCard style={{ marginTop: 16, minHeight: 156 }}>
          <TableCardTitle>Produtos mais vendidos</TableCardTitle>
        </TableCard>
      </Container>

      <ContactButtonContainer activeOpacity={0.6}>
        <ContactButtonText>Contato</ContactButtonText>
      </ContactButtonContainer>
    </>
  );
};
export default Financial;
