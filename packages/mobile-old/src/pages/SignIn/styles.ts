import { Platform } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';

import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  padding: 0 30px ${Platform.OS === 'android' ? 48 : 40}px;

  align-items: center;
  justify-content: center;
`;

export const FormContainer = styled.View`
  background: #344c66;
  border-radius: 8px;
  padding: 24px;

  width: 100%;

  align-items: center;
`;

export const LogoImage = styled.Image`
  margin-top: 8px;
  margin-bottom: 24px;
`;

export const ForgotPassword = styled.TouchableOpacity`
  margin-top: 24px;
`;

export const ForgotPasswordText = styled.Text`
  color: #fff;
  font-size: 16px;
`;

export const CreateAccount = styled.TouchableOpacity`
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  background: #454545;
  border-top-width: 1px;
  border-color: #fff;
  padding: 16px 0 ${16 + getBottomSpace()}px;

  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

export const CreateAccountText = styled.Text`
  color: #fff;
  font-size: 18px;
  margin-left: 16px;
`;

export const SocialButtonsContainer = styled.View`
  margin-top: 24px;
`;
