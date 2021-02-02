import React from 'react';
import { useMemo } from 'react';
import { DataTable } from 'react-native-paper';

import Header from '../../components/Header';
import { IFormattedBilliing } from '../../interfaces/billings';
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
  const formattedMostSoldProducts: IFormattedBilliing[] = useMemo(
    () =>
      mostSoldProducts.map<IFormattedBilliing>(bill => ({
        name: bill.name,
        value: formatRealValue(bill.value),
      })),
    [mostSoldProducts],
  );

  return (
    <>
      <Header />

      <Container>
        <TableCard>
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
      </Container>

      <ContactButtonContainer activeOpacity={0.6}>
        <ContactButtonText>Contato</ContactButtonText>
      </ContactButtonContainer>
    </>
  );
};
export default Financial;
