import React from 'react';
import { StatusBar } from 'react-native';

import { createDrawerNavigator } from '@react-navigation/drawer';

import CustomDrawer from '../components/CustomDrawer';
import { useAuth } from '../hooks/auth';
import Home from '../pages/Home';
import SignIn from '../pages/SignIn';

const Drawer = createDrawerNavigator();

const AppRoutes: React.FC = () => {
  const auth = useAuth();

  return (
    <>
      <StatusBar backgroundColor="#344c66" barStyle="light-content" />

      <Drawer.Navigator
        initialRouteName="Home"
        drawerContent={CustomDrawer(auth)}
      >
        <Drawer.Screen name="Home" component={Home} />

        <Drawer.Screen name="SignIn" component={SignIn} />
      </Drawer.Navigator>
    </>
  );
};

export default AppRoutes;
