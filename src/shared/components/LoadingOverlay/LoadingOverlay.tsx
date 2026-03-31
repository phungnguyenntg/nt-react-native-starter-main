import { COLORS } from "@/theme/colors";
import { ActivityIndicator, Modal, View } from "react-native";
import { styles } from "./LoadingOverlay.styles";
import { LoadingOverlayProps } from "./LoadingOverlay.types";

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ visible }) => {
    return (
        <Modal
            transparent
            animationType="fade"
            visible={visible}
            statusBarTranslucent
        >
            <View style={styles.container}>
                <View style={styles.indicatorWrapper}>
                    <ActivityIndicator size="large" color={COLORS.primary} testID="loading-indicator" />
                </View>
            </View>
        </Modal>
    );
};