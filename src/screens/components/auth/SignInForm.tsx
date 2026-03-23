import React, { useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { COLORS } from '../../theme/color';
import { AdvancedCheckbox } from 'react-native-advanced-checkbox';
import BiometricIcon from '../../../assets/icons/biometric.svg';

const schema = yup.object({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
  useBiometrics: yup.boolean().default(false),
});

type FormData = {
  username: string;
  password: string;
  useBiometrics: boolean;
};


const SignInForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const passwordRef = useRef<TextInput>(null);

  const onSubmit = (data: FormData) => {
    // console.log('Submit:', data);
    //passwordRef.current?.focus();
  };

  return (
    <View>
        <View style={styles.container}>
          <View>
              <Text style={styles.inputLabel}>Username</Text>
              <Controller
                  control={control}
                  name="username"
                  render={({ field: { onChange, value } }) => (
                      <TextInput value={value} onChangeText={onChange} returnKeyType='next' onSubmitEditing={() => passwordRef.current?.focus()} style={styles.input} />
                  )}
              />
              {errors.username && <Text style={styles.errorText}>{errors.username.message}</Text>}
          </View>

          <View>
              <Text style={styles.inputLabel}>Password</Text>
              <Controller
                  control={control}
                  name="password"
                  render={({ field: { onChange, value } }) => (
                      <TextInput ref={passwordRef} value={value} onChangeText={onChange} secureTextEntry returnKeyType='done' style={styles.input} />
                  )}
              />
              {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}
          </View>
          <TouchableOpacity style={styles.forgotPasswordButton}>
              <Text style={styles.forgotPassword}>Forgot Password?</Text>
          </TouchableOpacity>
          <Controller
            control={control}
            name="useBiometrics"
            render={({ field: { onChange, value } }) => (
              <AdvancedCheckbox
                label="Use biometrics for faster login"
                value={value}
                size={18}
                labelStyle={styles.biometricLabel}
                onValueChange={onChange}
                checkedColor="#0DF2F2"
              />
            )}
          />

          <TouchableOpacity onPress={handleSubmit(onSubmit)} style={styles.signInButton}>
              <Text style={styles.signInButtonText}>Sign In</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.biometricSignInButton}>
              <View style={styles.biometricButtonContent}>
                  <BiometricIcon width={20} height={20} />
                  <Text style={styles.biometricSignInButtonText}>Sign In with Biometrics</Text>
              </View>
          </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        gap: 16
    },
    inputLabel: {
        marginBottom: 4,
        color: '#374151',
    },
    input: {
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: 12,
        paddingLeft: 12,
        color: '#6B7280',
    },
    forgotPasswordButton: {
        alignSelf: 'flex-end',
    },
    forgotPassword: {
        color: COLORS.primary,
        fontWeight: 500
    },
    biometricLabel: {
        color: '#4B5563',
        fontWeight: 400,
    },
    errorText: {
        color: 'red'
    },
    signInButton: {
        backgroundColor: COLORS.primary,
        borderRadius: 12,
        elevation: 2
    },
    signInButtonText: {
        color: '#111827',
        fontWeight: 700,
        fontSize: 16,
        textAlign: 'center',
        paddingVertical: 12,
    },
    biometricSignInButton: {
        borderWidth: 2,
        borderColor: '#0DF2F24D',
        borderRadius: 12,
    },
    biometricButtonContent: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 4
    },
    biometricSignInButtonText: {
        color: '#0DF2F2',
        fontWeight: 700,
        fontSize: 16,
        textAlign: 'center',
        paddingVertical: 12,
    },
});

export default SignInForm;