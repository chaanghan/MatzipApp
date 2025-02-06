import React from 'react';
import {View, Button, SafeAreaView} from 'react-native';

// 모든 화면 컴포넌트는 navigation이라는 props가 전달된다.
function AuthHomeScreen({}) {
  return (
    <SafeAreaView>
      <View>
        <Button title="로그인" />
      </View>
    </SafeAreaView>
  );
}

export default AuthHomeScreen;
