import React, {useRef, useState} from 'react';
import {View, Text, SafeAreaView, StyleSheet} from 'react-native';
import InputField from '../../components/InputField';
import CustomButton from '../../components/CustomButton';
import useForm from '../../hooks/useForm';
import {validateLogin} from '../../utils/validate';
import {TextInput} from 'react-native-gesture-handler';

function LoginScreen() {
  const passwordRef = useRef<TextInput | null>(null);
  const login = useForm({
    initialValue: {
      email: '',
      password: '',
    },
    validate: validateLogin,
  });
  const handleSubmit = () => {
    console.log('values', login.value);
  };
  return (
    <SafeAreaView style={styels.container}>
      <View style={styels.inputContainer}>
        <InputField
          autoFocus // 이메일 input에 자동으로 커서가 가면서 키보드가 생김
          placeholder="이메일"
          error={login.error.email}
          inputMode="email"
          touched={login.touched.email}
          blurOnSubmit={false}
          returnKeyType="next"
          onSubmitEditing={() => passwordRef.current?.focus()}
          {...login.getTextInputProps('email')}
        />
        <InputField
          ref={passwordRef}
          placeholder="비밀번호"
          error={login.error.password}
          touched={login.touched.password}
          blurOnSubmit={false}
          returnKeyType="join"
          secureTextEntry
          onSubmitEditing={handleSubmit}
          {...login.getTextInputProps('password')}
        />
      </View>
      <CustomButton
        label="로그인"
        variant="filled"
        size="large"
        onPress={handleSubmit}
      />
    </SafeAreaView>
  );
}

const styels = StyleSheet.create({
  container: {
    flex: 1,
    margin: 30,
  },
  inputContainer: {
    gap: 20,
    marginBottom: 30,
  },
});

export default LoginScreen;
