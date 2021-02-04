import React from 'react';
import { useMemo } from 'react';
import { Image } from 'react-native';
import { ScrollView, View } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { Table, Row } from 'react-native-table-component';

import stockPerformanceImg from '../../assets/stock-performance.png';
import Header from '../../components/Header';
import stocksMock from '../../mocks/stocks';

import {
  Container,
  InfoCard,
  InfoCardTitle,
  ContactButtonContainer,
  ContactButtonText,
} from './styles';

const Stock: React.FC = () => {
  const stocksTableCellsWidth = useMemo(() => [80, 96, 96, 96, 96], []);

  return (
    <>
      <Header />

      <Container
        contentContainerStyle={{ paddingBottom: getStatusBarHeight() + 96 }}
      >
        <InfoCard>
          <InfoCardTitle>Estoque</InfoCardTitle>

          <ScrollView horizontal>
            <View>
              <Table>
                <Row
                  data={[
                    'Código',
                    'Nome do produto',
                    'Estoque mínimo',
                    'Estoque atual',
                    'Situação',
                  ]}
                  widthArr={stocksTableCellsWidth}
                  textStyle={{
                    paddingTop: 8,
                    paddingBottom: 16,
                    paddingHorizontal: 16,
                    color: '#333',
                  }}
                  style={{
                    borderBottomWidth: 1,
                    borderBottomColor: '#ddd',
                  }}
                />
              </Table>

              <ScrollView>
                <Table>
                  {stocksMock.map(stock => (
                    <Row
                      key={stock.id}
                      data={[
                        stock.id,
                        stock.product_name,
                        stock.min_stock,
                        stock.current_stock,
                        stock.status,
                      ]}
                      widthArr={stocksTableCellsWidth}
                      textStyle={{
                        paddingVertical: 5,
                        paddingHorizontal: 16,
                        color: '#333',
                      }}
                      style={{
                        borderBottomWidth: 1,
                        borderBottomColor: '#eee',
                      }}
                    />
                  ))}
                </Table>
              </ScrollView>
            </View>
          </ScrollView>
        </InfoCard>

        <InfoCard
          style={{
            marginTop: 16,
          }}
        >
          <InfoCardTitle>Performance</InfoCardTitle>

          <Image
            source={stockPerformanceImg}
            style={{
              width: '100%',
              height: 464,
            }}
          />
        </InfoCard>
      </Container>

      <ContactButtonContainer activeOpacity={0.6}>
        <ContactButtonText>Contato</ContactButtonText>
      </ContactButtonContainer>
    </>
  );
};

export default Stock;
