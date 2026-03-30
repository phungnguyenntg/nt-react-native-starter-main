import { Text, View } from "react-native";
import { styles } from "./MediaLoginSection.styles";
import { MediaButton } from "../MediaButton";
import GoogleIcon from "@/assets/icons/google.svg";
import FacebookIcon from "@/assets/icons/facebook.svg";

export const MediaLoginSection = () => {
    return (
        <View>
            <View style={styles.dividerRow}>
                <View style={styles.line} />
                <Text style={styles.dividerText}>Or continue with</Text>
                <View style={styles.line} />
            </View>
            <View style={styles.mediaButtonContainer}>
                <MediaButton
                    label="Google"
                    icon={<GoogleIcon width={24} height={24} />}
                    onPress={() => console.log('Google pressed')}
                    style={{ backgroundColor: '#fff' }}
                    labelStyle={{ color: '#374151' }}
                />
                <MediaButton
                    label="Facebook"
                    icon={<FacebookIcon width={24} height={24} />}
                    onPress={() => console.log('Facebook pressed')}
                    style={{ backgroundColor: '#fff' }}
                    labelStyle={{ color: '#374151' }}
                />
            </View>
        </View>
    );
}