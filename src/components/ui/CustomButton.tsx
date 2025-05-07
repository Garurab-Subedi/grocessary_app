import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { FC } from 'react'
import { Colors, Fonts } from '@utils/Constants';
import CustomText from './CustomText';

interface CustomButtonProps {
  onPress?: () => void;
  title: string;
  disabled: boolean;
  loading: boolean;
}

const CustomButton:FC<CustomButtonProps> = ({onPress,loading,title,disabled}) => {
  return (
    <TouchableOpacity
    onPress={onPress}
    disabled={disabled}
    activeOpacity={0.8}
    style={[styles.button, { backgroundColor: disabled ? Colors.disabled : Colors.secondary }]}
    >{
        loading ? 
        <ActivityIndicator color="#fff" size="small" /> :
        <CustomText style={styles.buttonText} variant='h6' fontFamily={Fonts.SemiBold}>
          {title}
        </CustomText>
      }
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 15,
    marginVertical: 15,
    width: '100%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default CustomButton;

