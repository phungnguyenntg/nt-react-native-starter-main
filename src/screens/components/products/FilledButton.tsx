import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

type Props = {
    title: string,
    textColor: string,
    backgroundColor: string,
    onPress: () => void
}

const FilledButton = ({ title, textColor = '#fff', backgroundColor = '#000', onPress } : Props) => {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: backgroundColor }]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={[styles.text, { color: textColor }]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
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

export default FilledButton;