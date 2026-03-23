import { Text, View, StyleSheet } from "react-native";
import MediaButton from "./MediaButton";

import GoogleIcon from '../../../assets/icons/google.svg';
import FacebookIcon from '../../../assets/icons/facebook.svg';

const MediaLoginSection = () => {
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

const styles = StyleSheet.create({
    dividerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: '#E5E7EB',
    },
    dividerText: {
        marginHorizontal: 10,
        color: '#6B7280',
    },
    mediaButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 16
    },
    label: {
        color: '#374151',
        fontWeight: 500
    }
});

export default MediaLoginSection;