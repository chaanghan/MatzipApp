import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AuthHomeScreen from '../screens/AuthHomeScreen';
import LoginScreen from '../screens/LoginScreen';
import {authStackNavigations} from '../constants';

// param을 typeing 하는 경우는 상세 스크린과 같이 id 값을 쓰는 스크린에 해주면 됨
// 사용할 곳이 많으므로 'AuthHome', 'Login'을 상수처리하는 것이 좋음
export type AuthStackParamList = {
  [authStackNavigations.AUTH_HOME]: undefined;
  [authStackNavigations.LOGIN]: undefined;
};

function AuthStackNavigator() {
  const Stack = createStackNavigator<AuthStackParamList>();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={authStackNavigations.AUTH_HOME}
        component={AuthHomeScreen}
      />
      <Stack.Screen name={authStackNavigations.LOGIN} component={LoginScreen} />
    </Stack.Navigator>
  );
}

export default AuthStackNavigator;
