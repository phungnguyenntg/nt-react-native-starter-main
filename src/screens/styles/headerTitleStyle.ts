import { TextStyle } from "react-native";
import { COLORS } from "../theme/color";

export const headerTitleStyle: Pick<TextStyle, 'fontFamily' | 'fontSize' | 'fontWeight'> & { color?: string } = {
  fontSize: 20,
  fontWeight: 700,
  color: COLORS.textSecondary,
};