import { Text, TouchableOpacity } from "react-native";
import { styles } from "./FilledButton.styles";
import { Props } from "./FilledButton.types";

export const FilledButton = ({ title, textColor = '#fff', backgroundColor = '#000', onPress } : Props) => {
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