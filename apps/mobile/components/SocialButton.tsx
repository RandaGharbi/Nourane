import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';

type Props = {
  text: string;
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: object;
};

const SocialButton: React.FC<Props> = ({ text, onPress, style, textStyle }) => (
  <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
    <Text style={[styles.buttonText, textStyle]}>{text}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#F6F4F2',
    borderRadius: 24,
    paddingVertical: 14,
    alignItems: 'center',
    marginVertical: 6,
  },
  buttonText: {
    fontWeight: 'bold',
    color: '#222',
    fontSize: 16,
  },
});

export default SocialButton;