import React, { useEffect } from 'react';
import { useState } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { Feather } from '@expo/vector-icons';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import * as ScreenOrientation from 'expo-screen-orientation';

import { useAuth } from '../../hooks/auth';

import { Container, UserLabel, Left } from './styles';

const Header: React.FC = ({ children }) => {
  const { user } = useAuth();

  const { dispatch } = useNavigation();

  const [orientation, setOrientation] = useState<ScreenOrientation.Orientation>(
    ScreenOrientation.Orientation.PORTRAIT_UP,
  );

  useEffect(() => {
    async function loadOrientation() {
      const getOrientation = await ScreenOrientation.getOrientationAsync();

      setOrientation(getOrientation);
    }

    ScreenOrientation.addOrientationChangeListener(() => loadOrientation());
  }, []);

  return (
    <Container orientation={orientation}>
      <Left>
        <TouchableOpacity
          onPress={() => dispatch(DrawerActions.toggleDrawer())}
          style={{
            marginRight: 16,
          }}
        >
          <Feather name="menu" size={32} color="#333" />
        </TouchableOpacity>

        {children}
      </Left>

      <UserLabel>Bem vindo, {user?.data.displayName}</UserLabel>
    </Container>
  );
};

export default Header;
