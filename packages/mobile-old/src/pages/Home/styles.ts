import { getBottomSpace } from 'react-native-iphone-x-helper';

import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
`;

export const ContactButtonContainer = styled.TouchableOpacity`
  position: absolute;
  bottom: 0;

  background: #344c66;
  width: 100%;
  min-height: 56px;

  padding: 16px 0 ${16 + getBottomSpace()}px;

  justify-content: center;
  align-items: center;
`;

export const ContactButtonText = styled.Text`
  color: #fff;
  font-size: 20px;
`;
