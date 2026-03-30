import { useAppDispatch } from "@/store/hooks";
import { useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import Logo from "@/assets/icons/logo.svg";
import { MediaLoginSection } from "../components/MediaLoginSection";
import { SignInForm, SignInFormData } from "../components/SignInForm";
import { SignUpForm } from "../components/SignUpForm";
import { TermsText } from "../components/TermText";
import { loginThunk } from "../store/auth.thunks";
import { styles } from "./LoginScreen.styles";
import { TABS, TabType } from "./LoginScreen.types";

export const LogInScreen = () => {
    const [activeTab, setActiveTab] = useState<TabType>('signin');
    const dispatch = useAppDispatch();

    const handleSignIn = async (data: SignInFormData) => {
        try {
            await dispatch(loginThunk({ username: data.username, password: data.password }));
        } catch (error: any) {
            Alert.alert('Login Failed', error.message || 'Something went wrong');
            return;
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