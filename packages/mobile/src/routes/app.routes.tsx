import React from 'react';
import { StatusBar } from 'react-native';

import { createDrawerNavigator } from '@react-navigation/drawer';

import CustomDrawer from '../components/CustomDrawer';
import { useAuth } from '../hooks/auth';
import Financial from '../pages/FInancial';
import Home from '../pages/Home';
import Sales from '../pages/Sales';
import SignIn from '../pages/SignIn';

const Drawer = createDrawerNavigator();

const AppRoutes: React.FC = () => {
  const auth = useAuth();

  return (
    <>
      <StatusBar backgroundColor="#e5e5e5" barStyle="dark-content" />

      <Drawer.Navigator
        initialRouteName="Home"
        drawerContent={CustomDrawer(auth)}
      >
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="Financial" component={Financial} />
        <Drawer.Screen name="Sales" component={Sales} />

        <Drawer.Screen name="SignIn" component={SignIn} />
      </Drawer.Navigator>
    </>
  );
};

export default AppRoutes;
