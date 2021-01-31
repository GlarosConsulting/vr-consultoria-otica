import React from 'react';
import { StatusBar } from 'react-native';

import { createDrawerNavigator } from '@react-navigation/drawer';

import CustomDrawer from '../components/CustomDrawer';
import { useAuth } from '../hooks/auth';
import DetailedInspection from '../pages/DetailedInspection';
import Home from '../pages/Home';
import Inspection from '../pages/Inspection';
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
        <Drawer.Screen name="Inspection" component={Inspection} />
        <Drawer.Screen
          name="DetailedInspection"
          component={DetailedInspection}
        />

        <Drawer.Screen name="SignIn" component={SignIn} />
      </Drawer.Navigator>
    </>
  );
};

export default AppRoutes;
