import { useState } from "react";
import { Text, View, StyleSheet, ActivityIndicator, Alert, TouchableOpacity } from "react-native";
import { COLORS } from "./theme/color";
import Logo from "../assets/icons/logo.svg";
import SignInForm, { SignInFormData } from "./components/auth/SignInForm";
import SignUpForm from "./components/auth/SignUpForm";
import MediaLoginSection from "./components/auth/MediaLoginSection";
import TermsText from "./components/auth/TermText";
import { useAuth } from "../contexts/auth-context";
import { RootStackParamList } from "./navigator/root-navigator";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type TabType = 'signin' | 'signup';

const TABS = [
    { key: 'signin', label: 'Login' },
    { key: 'signup', label: 'Sign Up' },
] as const;

type Props = NativeStackScreenProps<RootStackParamList, 'SignIn'>;

const SignInScreen = ({ route, navigation }: Props) => {
    const [activeTab, setActiveTab] = useState<TabType>('signin');
    const { login } = useAuth();

    const handleSignIn = async (data: SignInFormData) => {
        try {
            await login(data.username, data.password);
        } catch (error: any) {
            Alert.alert('Login Failed', error.message || 'Something went wrong');
            return;
        }

        if (route.params?.redirectTo) {
            navigation.navigate('MainTab', { screen: route.params.redirectTo });
        } else {
            navigation.navigate('MainTab', { screen: 'ProfileTab' });
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <View style={styles.logoContainer}>
                    <View style={styles.logo}>
                        <Logo width={40} height={40} />
                    </View>
                </View>
                <View style={styles.headerContainer}>
                    <Text style={styles.welcomeText}>Welcome Back</Text>
                    <Text style={styles.enterDetailsText}>Please enter your details</Text>
                </View>
                <View style={styles.tabContainer}>
                    {TABS.map(tab => {
                        const active = activeTab === tab.key;

                        return (
                            <TouchableOpacity
                                key={tab.key}
                                style={[styles.tabButton, active && styles.activeTabButton]}
                                onPress={() => setActiveTab(tab.key)}
                            >
                                <Text
                                    style={[styles.tabText, active && styles.activeTabText]}
                                >
                                    {tab.label}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>
                <View style={{ display: activeTab === 'signin' ? 'flex' : 'none' }}>
                    <SignInForm onSignIn={handleSignIn} />
                </View>
                <View style={{ display: activeTab === 'signup' ? 'flex' : 'none' }}>
                    <SignUpForm />
                </View>
                <MediaLoginSection />
                <TermsText />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.background,
        flex: 1
    },
    content: {
        flexDirection: 'column',
        marginTop: 16,
        marginHorizontal: 16,
        backgroundColor: 'white',
        padding: 32,
        gap: 32
    },
    logoContainer: {
        alignItems: 'center',
    },
    logo: {
        width: 64,
        height: 64,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        backgroundColor: '#0DF2F21A'
    },
    headerContainer: {
        alignItems: 'center'
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: '700',
        color: '#1F2937'
    },
    enterDetailsText: {
        color: '#6B7280',
        fontSize: 16
    },
    tabContainer: {
        flexDirection: 'row',
        backgroundColor: '#F3F4F6',
        borderRadius: 12,
        padding: 4,
        fontWeight: '500',
    },
    tabButton: {
        fontSize: 14,
        fontWeight: '500',
        paddingHorizontal: 16
    },
    activeTabButton: {
        backgroundColor: 'white',
        borderRadius: 12,
    },
    tabText: {
        fontSize: 14,
        fontWeight: '500',
        marginVertical: 8,
        marginHorizontal: 40,
        color: '#6B7280'
    },
    activeTabText: {
        color: '#1F2937'
    },
    termAndPolicyText: {
        alignContent: 'center',
        marginTop: 24,
        alignItems: 'center',
    },
    termAndPolicyLink: {
        color: COLORS.primary,
        fontWeight: '500'
    },
});

export default SignInScreen;