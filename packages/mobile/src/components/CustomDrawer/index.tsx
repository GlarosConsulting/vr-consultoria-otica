import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';

import { Feather } from '@expo/vector-icons';
import {
  DrawerContentComponentProps,
  DrawerContentOptions,
} from '@react-navigation/drawer';
import { DrawerActions } from '@react-navigation/native';

import { IAuthContextData } from '../../hooks/auth';

import {
  Container,
  DrawerHeader,
  DrawerHeaderTitle,
  DrawerHeaderVersion,
  UserNameText,
  MenuContainer,
  MenuItemContainer,
  MenuItemLabelContainer,
  MenuItemText,
} from './styles';

const CustomDrawer = ({ user, signOut }: IAuthContextData) => ({
  navigation: { navigate, dispatch },
}: DrawerContentComponentProps<DrawerContentOptions>) => {
  function handleSignOut() {
    navigate('SignIn');

    dispatch(DrawerActions.closeDrawer());

    signOut();
  }

  return (
    <Container>
      <ScrollView>
        <DrawerHeader>
          <DrawerHeaderTitle>MENU PRINCIPAL</DrawerHeaderTitle>
          <DrawerHeaderVersion>Versão 1.0.0</DrawerHeaderVersion>
        </DrawerHeader>

        <UserNameText>{user?.data.displayName}</UserNameText>

        <MenuContainer>
          <MenuItemContainer>
            <MenuItemLabelContainer
              activeOpacity={0.5}
              onPress={() => navigate('Home')}
            >
              <Feather name="home" size={16} />
              <MenuItemText>Início</MenuItemText>
            </MenuItemLabelContainer>
          </MenuItemContainer>

          <MenuItemContainer>
            <MenuItemLabelContainer
              activeOpacity={0.5}
              onPress={() => navigate('Financial')}
            >
              <Feather name="dollar-sign" size={16} />
              <MenuItemText>Financeiro</MenuItemText>
            </MenuItemLabelContainer>
          </MenuItemContainer>

          <MenuItemContainer>
            <MenuItemLabelContainer
              activeOpacity={0.5}
              onPress={() => navigate('Stock')}
            >
              <Feather name="package" size={16} />
              <MenuItemText>Estoque</MenuItemText>
            </MenuItemLabelContainer>
          </MenuItemContainer>

          <MenuItemContainer>
            <MenuItemLabelContainer
              activeOpacity={0.5}
              onPress={() => navigate('Sales')}
            >
              <Feather name="tag" size={16} />
              <MenuItemText>Vendas</MenuItemText>
            </MenuItemLabelContainer>
          </MenuItemContainer>

          <MenuItemContainer>
            <MenuItemLabelContainer activeOpacity={0.5}>
              <Feather name="file-text" size={16} />
              <MenuItemText>Tarefas</MenuItemText>
            </MenuItemLabelContainer>
          </MenuItemContainer>

          <MenuItemContainer>
            <MenuItemLabelContainer activeOpacity={0.5}>
              <Feather name="edit-3" size={16} />
              <MenuItemText>Termos e condições</MenuItemText>
            </MenuItemLabelContainer>
          </MenuItemContainer>

          <MenuItemContainer>
            <MenuItemLabelContainer activeOpacity={0.5} onPress={handleSignOut}>
              <Feather name="log-out" size={16} />
              <MenuItemText>Sair</MenuItemText>
            </MenuItemLabelContainer>
          </MenuItemContainer>
        </MenuContainer>
      </ScrollView>
    </Container>
  );
};

export default CustomDrawer;
