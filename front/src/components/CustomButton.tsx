import React from 'react';
import {
  Text,
  Pressable,
  StyleSheet,
  PressableProps,
  Dimensions,
} from 'react-native';
import {colors} from '../constants/colors';

// Pressasble 컴포넌트가 제공하는 props의 타입을 따로 만들지 않고 확장
interface CustomButtonProps extends PressableProps {
  label: string; // 버튼에 보여지는 라벨
  variant?: 'filled' | 'outlined'; // 버튼의 디자인
  size?: 'large' | 'medium';
  inValid?: boolean; // 버튼의 활성화 여부
}

// ios는 screen, window 차이점이 없다. android는 차이가 있다.
const deviceHeight = Dimensions.get('screen').height;

function CustomButton({
  label,
  variant = 'filled',
  size = 'large',
  inValid = false,
  ...props // 확장된 Pressable props들
}: CustomButtonProps) {
  return (
    <Pressable
      style={({pressed}) => [
        styles.container,
        styles[size],
        inValid && styles.inValid,
        pressed ? styles[`${variant}Pressed`] : styles[variant],
      ]}
      {...props}>
      <Text style={[styles[`${variant}Text`], styles.text]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 3,
    justifyContent: 'center',
  },
  inValid: {
    opacity: 0.5,
  },

  large: {
    width: '100%',
    paddingVertical: deviceHeight > 700 ? 15 : 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  medium: {
    width: '50%',
    paddingVertical: deviceHeight > 700 ? 12 : 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filled: {
    backgroundColor: colors.PINK_700,
  },
  outlined: {
    borderColor: colors.PINK_700,
    borderWidth: 1,
  },
  filledPressed: {
    backgroundColor: colors.PINK_500,
  },
  outlinedPressed: {
    borderColor: colors.PINK_700,
    borderWidth: 1,
    opacity: 0.5,
  },
  text: {
    fontSize: 16,
    fontWeight: '700',
  },
  filledText: {
    color: colors.WHITE,
  },
  outlinedText: {
    color: colors.PINK_700,
  },
});
export default CustomButton;
