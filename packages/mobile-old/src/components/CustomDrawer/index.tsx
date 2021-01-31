import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';

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

        <UserNameText>{user?.displayName}</UserNameText>

        <MenuContainer>
          <MenuItemContainer>
            <MenuItemLabelContainer
              activeOpacity={0.5}
              onPress={() => navigate('Home')}
            >
              <Icon name="home" size={16} />
              <MenuItemText>Início</MenuItemText>
            </MenuItemLabelContainer>
          </MenuItemContainer>

          <MenuItemContainer>
            <MenuItemLabelContainer
              activeOpacity={0.5}
              onPress={() => navigate('Home')}
            >
              <Icon name="edit" size={16} />
              <MenuItemText>Meus dados</MenuItemText>
            </MenuItemLabelContainer>
          </MenuItemContainer>

          <MenuItemContainer>
            <MenuItemLabelContainer
              activeOpacity={0.5}
              onPress={() => navigate('Home')}
            >
              <Icon name="mail" size={16} />
              <MenuItemText>Mensagens</MenuItemText>
            </MenuItemLabelContainer>
          </MenuItemContainer>

          <MenuItemContainer>
            <MenuItemLabelContainer
              activeOpacity={0.5}
              onPress={() => navigate('Home')}
            >
              <Icon name="dollar-sign" size={16} />
              <MenuItemText>Financeiro</MenuItemText>
            </MenuItemLabelContainer>
          </MenuItemContainer>

          <MenuItemContainer>
            <MenuItemLabelContainer
              activeOpacity={0.5}
              onPress={() => navigate('Inspection')}
            >
              <Icon name="image" size={16} />
              <MenuItemText>Vistoria</MenuItemText>
            </MenuItemLabelContainer>
          </MenuItemContainer>

          <MenuItemContainer>
            <MenuItemLabelContainer
              activeOpacity={0.5}
              onPress={() => navigate('DetailedInspection')}
            >
              <Icon name="image" size={16} />
              <MenuItemText>Vistoria detalhada</MenuItemText>
            </MenuItemLabelContainer>
          </MenuItemContainer>

          <MenuItemContainer>
            <MenuItemLabelContainer
              activeOpacity={0.5}
              onPress={() => navigate('Home')}
            >
              <Icon name="align-left" size={16} />
              <MenuItemText>Termos e condições</MenuItemText>
            </MenuItemLabelContainer>
          </MenuItemContainer>

          <MenuItemContainer>
            <MenuItemLabelContainer activeOpacity={0.5} onPress={handleSignOut}>
              <Icon name="log-out" size={16} />
              <MenuItemText>Sair</MenuItemText>
            </MenuItemLabelContainer>
          </MenuItemContainer>
        </MenuContainer>
      </ScrollView>
    </Container>
  );
};

export default CustomDrawer;
