import React from 'react';
import { StatusBar } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';

import CreateAccount from '../pages/CreateAccount';
import Home from '../pages/Home';
import SignIn from '../pages/SignIn';

const Stack = createStackNavigator();

const AuthRoutes: React.FC = () => (
  <>
    <StatusBar backgroundColor="#f2f2f2" barStyle="dark-content" />

    <Stack.Navigator initialRouteName="SignIn" headerMode="none">
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="CreateAccount" component={CreateAccount} />

      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  </>
);

export default AuthRoutes;
