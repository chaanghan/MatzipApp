import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {Dimensions, Image, SafeAreaView, StyleSheet, View} from 'react-native';
import {AuthStackParamList} from '../../navigations/stack/AuthStackNavigator';
import {authStackNavigations} from '../../constants/navigations';
import CustomButton from '../../components/CustomButton';

// screen typing
type AuthHomeScreenProps = StackScreenProps<AuthStackParamList, 'AuthHome'>;

// 모든 화면 컴포넌트는 navigation이라는 props가 전달된다.
function AuthHomeScreen({navigation}: AuthHomeScreenProps) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          resizeMode="contain"
          source={require('../../assets/try.png')}
        />
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton
          label="로그인"
          onPress={() => navigation.navigate(authStackNavigations.LOGIN)}
        />
        <CustomButton
          label="회원가입"
          variant="outlined"
          onPress={() => navigation.navigate(authStackNavigations.SIGNUP)}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 30,
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1.5,
    width: Dimensions.get('screen').width,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  buttonContainer: {
    flex: 1,
    gap: 10,
  },
});

export default AuthHomeScreen;
