import { Text, TouchableOpacity, View } from "react-native";
import { MediaButtonProps } from "./MediaButton.types";
import { styles } from "./MediaButton.styles";

export const MediaButton: React.FC<MediaButtonProps> = ({
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