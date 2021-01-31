import { getStatusBarHeight } from 'react-native-iphone-x-helper';

import styled from 'styled-components/native';

export const Container = styled.View`
  background: #344c66;
  min-height: 64px;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  padding: 16px;
  padding-top: ${16 + getStatusBarHeight()}px;
`;

export const Left = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const LogoImage = styled.Image`
  width: 80px;
  height: 40px;

  margin-left: 20px;
`;

export const UserLabel = styled.Text`
  color: #fff;
  font-size: 17px;
`;
