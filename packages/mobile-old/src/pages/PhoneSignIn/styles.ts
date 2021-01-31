import { getBottomSpace } from 'react-native-iphone-x-helper';

import styled from 'styled-components/native';

export const GoBackButton = styled.TouchableOpacity`
  position: absolute;
  left: 0;
  top: 0;
  padding: 16px 0 ${16 + getBottomSpace()}px;
  margin-left: 16px;
  margin-top: 8px;

  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

export const GoBackButtonText = styled.Text`
  color: #e1e1e6;
  font-size: 18px;
  margin-left: 16px;
`;

export const BackToSignIn = styled.TouchableOpacity`
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  background: #485460;
  border-top-width: 1px;
  border-color: #e1e1e6;
  padding: 16px 0 ${16 + getBottomSpace()}px;

  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

export const BackToSignInText = styled.Text`
  color: #fff;
  font-size: 18px;
  margin-left: 16px;
`;
