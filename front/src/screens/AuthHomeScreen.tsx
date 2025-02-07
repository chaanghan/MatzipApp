import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {View, Button, SafeAreaView} from 'react-native';
import {AuthStackParamList} from '../navigations/stack/AuthStackNavigator';
import {authStackNavigations} from '../constants';

// screen typing
type AuthHomeScreenProps = StackScreenProps<AuthStackParamList, 'AuthHome'>;

// 모든 화면 컴포넌트는 navigation이라는 props가 전달된다.
function AuthHomeScreen({navigation}: AuthHomeScreenProps) {
  return (
    <SafeAreaView>
      <View>
        <Button
          title="로그인"
          onPress={() => navigation.navigate(authStackNavigations.LOGIN)}
        />
        <Button
          title="회원가입"
          onPress={() => navigation.navigate(authStackNavigations.SIGNUP)}
        />
      </View>
    </SafeAreaView>
  );
}

export default AuthHomeScreen;
