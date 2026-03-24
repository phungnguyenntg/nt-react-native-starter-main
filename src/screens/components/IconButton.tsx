import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { COLORS } from '../theme/color';

interface IconButtonProps {
  label: string;
  onPress: () => void;
  icon: React.ReactNode;
}

const IconButton: React.FC<IconButtonProps> = ({
    label,
    onPress,
    icon
}) => {
    return (
        <TouchableOpacity
            style={styles.button}
            onPress={onPress}
        >
            {icon}
            <Text style={styles.label}>{label}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
  button: {
    width:36,
    height: 36,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    backgroundColor: COLORS.background,
  },
  label: {
    fontSize: 14,
    color: '',
  },
});

export default IconButton;