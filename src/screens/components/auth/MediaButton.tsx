import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View, ViewStyle, TextStyle } from 'react-native';

interface MediaButtonProps {
  label: string;
  onPress: () => void;
  icon: React.ReactNode;
  style?: ViewStyle;
  labelStyle?: TextStyle;
  disabled?: boolean;
}

const MediaButton: React.FC<MediaButtonProps> = ({
  label,
  onPress,
  icon,
  style,
  labelStyle,
  disabled = false,
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, style, disabled && { opacity: 0.6 }]}
      onPress={onPress}
      disabled={disabled}
    >
      <View style={styles.iconContainer}>{icon}</View>
      <Text style={[styles.label, labelStyle]}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    width: '48%',
    borderColor: '#E5E7EB',
    borderRadius: 12,
    backgroundColor: '#eee',
    marginVertical: 4,
  },
  iconContainer: {
    marginRight: 8,
  },
  label: {
    fontSize: 16,
    color: '#333',
  },
});

export default MediaButton;