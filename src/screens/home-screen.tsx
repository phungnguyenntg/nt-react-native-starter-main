import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text, TouchableHighlight, View } from 'react-native';
import { HomeStackParamList } from './navigator/home-stack';

type Props = NativeStackScreenProps<HomeStackParamList, 'Home'>;

const HomeScreen = ({ navigation }: Props) => {
    return (
        <View>
            <TouchableHighlight onPress={() => navigation.navigate('ProductDetail', { productId: '1' })}>
                <Text>Go to Product Detail</Text>
            </TouchableHighlight>
        </View>
    )
}

export default HomeScreen;