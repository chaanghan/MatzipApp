import React, {useState} from 'react';
import {View, Text, SafeAreaView, StyleSheet} from 'react-native';
import InputField from '../../components/InputField';
import CustomButton from '../../components/CustomButton';
import useForm from '../../hooks/useForm';
import {validateLogin} from '../../utils/validate';

function LoginScreen() {
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
          placeholder="이메일"
          error={login.error.email}
          inputMode="email"
          touched={login.touched.email}
          {...login.getTextInputProps('email')}
        />
        <InputField
          placeholder="비밀번호"
          error={login.error.password}
          touched={login.touched.password}
          secureTextEntry
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
