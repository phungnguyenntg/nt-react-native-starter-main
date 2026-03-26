import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

type Props = {
    title: string,
    textColor: string,
    borderColor: string,
    onPress: () => void
}

const OutlineButton = ({ title, textColor = '#000', borderColor = '#000', onPress } : Props) => {
  return (
    <TouchableOpacity
      style={[styles.button, { borderColor: borderColor }]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={[styles.text, { color: textColor }]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderWidth: 2,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: '700',
  },
});

export default OutlineButton;