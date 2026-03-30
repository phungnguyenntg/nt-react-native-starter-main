import { Text, TouchableOpacity } from "react-native";
import { styles } from "./OutlineButton.styles";
import { Props } from "./OutlineButton.types";

export const OutlineButton = ({ title, textColor = '#000', borderColor = '#000', onPress } : Props) => {
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