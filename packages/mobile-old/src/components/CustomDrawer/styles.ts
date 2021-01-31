import { getStatusBarHeight } from 'react-native-iphone-x-helper';

import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;

  padding: 12px 14px;
  padding-top: ${16 + getStatusBarHeight()}px;
`;

export const DrawerHeader = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: #080e33;
  padding-bottom: 4px;

  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
`;

export const DrawerHeaderTitle = styled.Text`
  font-size: 22px;
  color: #080e33;
  font-weight: bold;
`;

export const DrawerHeaderVersion = styled.Text`
  font-size: 10px;
  color: #080e33;
  margin-bottom: 2.5px;
`;

export const UserNameText = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-top: 24px;
`;

export const MenuContainer = styled.View`
  margin-top: 10px;
`;

export const MenuItemContainer = styled.View`
  border-top-width: 1px;
  border-top-color: #12162b;
`;

export const MenuItemLabelContainer = styled.TouchableOpacity`
  margin-left: 8px;
  padding: 8px 0;

  font-size: 17px;

  flex-direction: row;
  align-items: center;
`;

export const MenuItemText = styled.Text`
  margin-left: 8px;
  font-size: 17px;
`;
