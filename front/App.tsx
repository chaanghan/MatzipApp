import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  TextInput,
  SafeAreaView,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import AuthHomeScreen from './src/screens/AuthHomeScreen';

function App() {
  return (
    <NavigationContainer>
      <AuthHomeScreen />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
    margin: 10,
  },
});

export default App;
