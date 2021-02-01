import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { Feather } from '@expo/vector-icons';
import { DrawerActions, useNavigation } from '@react-navigation/native';

import { useAuth } from '../../hooks/auth';

import { Container, UserLabel, Left } from './styles';

const Header: React.FC = () => {
  const { user } = useAuth();

  const { dispatch } = useNavigation();

  return (
    <Container>
      <Left>
        <TouchableOpacity
          onPress={() => dispatch(DrawerActions.toggleDrawer())}
        >
          <Feather name="menu" size={32} color="#333" />
        </TouchableOpacity>
      </Left>

      <UserLabel>Bem vindo, {user?.data.displayName}</UserLabel>
    </Container>
  );
};

export default Header;
