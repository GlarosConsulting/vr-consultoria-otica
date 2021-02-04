import { getBottomSpace } from 'react-native-iphone-x-helper';

import styled from 'styled-components/native';

export const Container = styled.ScrollView`
  flex: 1;

  padding: 16px;
`;

export const InfoCard = styled.View`
  background: #fff;
  padding: 16px;
  border-radius: 8px;

  width: 100%;

  align-items: center;
`;

export const InfoCardTitle = styled.Text`
  color: #333;
  font-weight: bold;
  font-size: 18px;
  text-align: center;

  margin-bottom: 8px;
`;

export const ContactButtonContainer = styled.TouchableOpacity`
  position: absolute;
  bottom: 0;

  background: #e5e5e5;
  width: 100%;
  min-height: 56px;

  padding: 16px 0 ${16 + getBottomSpace()}px;

  justify-content: center;
  align-items: center;
`;

export const ContactButtonText = styled.Text`
  color: #333;
  font-size: 20px;
`;
