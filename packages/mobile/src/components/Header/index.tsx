import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { Feather } from '@expo/vector-icons';
import { DrawerActions, useNavigation } from '@react-navigation/native';

import logoImg from '../../assets/logo.png';
import { useAuth } from '../../hooks/auth';

import { Container, UserLabel, Left, LogoImage } from './styles';

const Header: React.FC = () => {
  const { user } = useAuth();

  const { dispatch } = useNavigation();

  return (
    <Container>
      <Left>
        <TouchableOpacity
          onPress={() => dispatch(DrawerActions.toggleDrawer())}
        >
          <Feather name="menu" size={32} color="#fff" />
        </TouchableOpacity>

        <LogoImage source={logoImg} />
      </Left>

      <UserLabel>Bem vindo, {user?.data.displayName}</UserLabel>
    </Container>
  );
};

export default Header;
