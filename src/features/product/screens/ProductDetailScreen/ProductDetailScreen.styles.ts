import { COLORS } from "@/theme";
import { Dimensions, StyleSheet } from "react-native";

const screenWidth = Dimensions.get('window').width;

export const styles = StyleSheet.create({
    image: {
        width: screenWidth,
        height: screenWidth
    },
    container: {
        gap: 16
    },
    mainContent: {
        marginTop: -16,
        backgroundColor: '#fff',
        padding: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
        elevation: 0.2
    },
    newArrivalText: {
        fontSize: 12,
        fontWeight: 700,
        color: COLORS.primary
    },
    productName: {
        color: COLORS.textSecondary,
        fontWeight: 700,
        fontSize: 24
    },
    ratingSection: {
        flexDirection: 'row',
        gap: 4
    },
    reviewNumber: {
        color: COLORS.textTertiary,
        marginTop: -2
    },
    price: {
        color: COLORS.textSecondary,
        fontWeight: 700,
        fontSize: 30
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 700,
        color: COLORS.textSecondary,
    },
    mainSection: {
        paddingVertical: 24,
        paddingHorizontal: 16,
        gap: 16,
        backgroundColor: '#fff',
    },
    bottomButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#fff',
        padding: 16
    },
    fixedBottom: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#fff',
        padding: 16,
        borderTopWidth: 0.5,
        borderColor: '#ddd',
    },
    descriptionText: {
        fontSize: 14,
        color: COLORS.textTertiary,
    },
    readMoreButton: {
        color: COLORS.primary,
        fontWeight: 600,
        fontSize: 14
    }
})