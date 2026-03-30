import { TextStyle, ViewStyle } from "react-native";

export interface MediaButtonProps {
  label: string;
  onPress: () => void;
  icon: React.ReactNode;
  style?: ViewStyle;
  labelStyle?: TextStyle;
  disabled?: boolean;
}