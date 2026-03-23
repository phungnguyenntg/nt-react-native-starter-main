import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ProfileStackParamList } from "./navigator/profile-stack";
import { Text, TouchableHighlight, View } from "react-native";

type Props = NativeStackScreenProps<ProfileStackParamList, 'Profile'>;

const ProfileScreen = ({ navigation }: Props) => {
    return (
        <View>
            {/* <TouchableHighlight onPress={() => navigation.navigate('Order', { hideBackButton: false })}>
                <Text>Go to Order</Text>
            </TouchableHighlight> */}
            <TouchableHighlight onPress={() => navigation.navigate('Setting')}>
                <Text>Go to Settings</Text>
            </TouchableHighlight>
        </View>
    )
}

export default ProfileScreen;