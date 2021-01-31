import { Platform } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';

import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  padding: 0 32px ${Platform.OS === 'android' ? 150 : 40}px;
  justify-content: center;
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

export const Title = styled.Text`
  font-size: 24px;
  color: #000;
  margin: 64px 0 24px;
`;
