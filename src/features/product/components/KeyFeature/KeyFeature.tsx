import { Text, View } from "react-native";
import { KeyFeatureProps } from "./KeyFeature.types";
import { styles } from "./KeyFeature.styles";

const KeyFeature: React.FC<KeyFeatureProps> = ({
    icon, title, value
}) => {
    return (
        <View style={styles.container}>
            <View style={styles.iconBox}>{icon}</View>
            <View>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.value}>{value}</Text>
            </View>
        </View>
    );
};

export default KeyFeature;