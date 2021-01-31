import React from 'react';
import { StatusBar } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';

import ForgotPassword from '../pages/ForgotPassword';
import Home from '../pages/Home';
import PhoneSignIn from '../pages/PhoneSignIn';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

const Stack = createStackNavigator();

const AuthRoutes: React.FC = () => (
  <>
    <StatusBar backgroundColor="#f2f2f2" barStyle="dark-content" />

    <Stack.Navigator initialRouteName="SignIn" headerMode="none">
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="PhoneSignIn" component={PhoneSignIn} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />

      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  </>
);

export default AuthRoutes;
