import { getBottomSpace } from 'react-native-iphone-x-helper';

import styled from 'styled-components/native';

export const Cards = styled.ScrollView`
  width: 100%;

  padding: 20px 16px 8px;
  margin-bottom: ${16 + getBottomSpace()}px;
`;

export const EmptyListContainer = styled.View`
  width: 100%;

  align-items: center;
`;

export const EmptyListText = styled.Text`
  font-size: 16px;
  color: #888;
`;
