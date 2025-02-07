import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {SafeAreaView} from 'react-native';
import {AuthStackParamList} from '../../navigations/stack/AuthStackNavigator';
import {authStackNavigations} from '../../constants/navigations';
import CustomButton from '../../components/CustomButton';

// screen typing
type AuthHomeScreenProps = StackScreenProps<AuthStackParamList, 'AuthHome'>;

// 모든 화면 컴포넌트는 navigation이라는 props가 전달된다.
function AuthHomeScreen({navigation}: AuthHomeScreenProps) {
  return (
    <SafeAreaView>
      <CustomButton
        label="로그인"
        onPress={() => navigation.navigate(authStackNavigations.LOGIN)}
      />
      <CustomButton
        label="회원가입"
        variant="outlined"
        onPress={() => navigation.navigate(authStackNavigations.SIGNUP)}
      />
    </SafeAreaView>
  );
}

export default AuthHomeScreen;
