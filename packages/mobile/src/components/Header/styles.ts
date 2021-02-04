import { Platform } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

import * as ScreenOrientation from 'expo-screen-orientation';
import styled, { css } from 'styled-components/native';

interface IContainerProps {
  orientation: ScreenOrientation.Orientation;
}

export const Container = styled.View<IContainerProps>`
  background: #e5e5e5;
  min-height: 64px;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  padding: 16px;

  ${({ orientation }) =>
    Platform.OS === 'ios' &&
    orientation !== ScreenOrientation.Orientation.LANDSCAPE_LEFT &&
    orientation !== ScreenOrientation.Orientation.LANDSCAPE_RIGHT &&
    css`
      padding-top: ${24 + getStatusBarHeight()}px;
    `}
`;

export const Left = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const UserLabel = styled.Text`
  color: #333;
  font-size: 17px;
`;
