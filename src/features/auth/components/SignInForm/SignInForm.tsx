import { yupResolver } from '@hookform/resolvers/yup';
import React, { useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { AdvancedCheckbox } from 'react-native-advanced-checkbox';
import * as yup from 'yup';
import BiometricIcon from '@/assets/icons/biometric.svg';
import { styles } from './SignInForm.styles';
import { SignInFormData } from './SignInForm.types';

const schema = yup.object({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
  useBiometrics: yup.boolean().default(false),
});

type SignInFormProps = {
  onSignIn: (data: SignInFormData) => void;
};

export const SignInForm = ({ onSignIn }: SignInFormProps) => {
  const { control, handleSubmit, formState: { errors }} = useForm<SignInFormData>({
    resolver: yupResolver(schema),
  });

  const passwordRef = useRef<TextInput>(null);
  const onSubmit = (data: SignInFormData) => {
    onSignIn(data);
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