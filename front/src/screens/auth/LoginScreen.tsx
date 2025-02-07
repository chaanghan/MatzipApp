import React, {useState} from 'react';
import {View, Text, SafeAreaView, StyleSheet} from 'react-native';
import InputField from '../../components/InputField';

function LoginScreen() {
  // const [value, setValue] = useState({
  //   email: '',
  //   password: '',
  // })
  // const handleChangeValue = (name: string, text: string) => {
  //   setValue({
  //     ...value, [name]: text,
  //   })
  // }
  const [touched, setTouched] = useState({
    email: false,
    password: false,
  });
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleChangeEmail = (text: string) => {
    setEmail(text);
  };
  const handleChangePassword = (text: string) => {
    setPassword(text);
  };
  const handleBlur = (name: string) => {
    setTouched({
      ...touched,
      [name]: true, //
    });
  };
  return (
    <SafeAreaView style={styels.container}>
      <View style={styels.inputContainer}>
        <InputField
          placeholder="이메일"
          error={'이메일을 입력하세요'}
          inputMode="email"
          value={email}
          onChangeText={handleChangeEmail}
          touched={touched.email}
          onBlur={() => handleBlur('email')} // 이메일 input 클릭시 touched 상태가 true로 변경
        />
        <InputField
          placeholder="비밀번호"
          error={'비밀번호를 입력하세요'}
          touched={touched.password}
          secureTextEntry
          value={password}
          onChangeText={handleChangePassword}
          onBlur={() => handleBlur('password')}
        />
      </View>
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
  },
});

export default LoginScreen;
