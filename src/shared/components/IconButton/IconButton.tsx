import { Text, TouchableOpacity } from "react-native";
import { IconButtonProps } from "./IconButton.types";
import { styles } from "./IconButton.styles";

export const IconButton: React.FC<IconButtonProps> = ({
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