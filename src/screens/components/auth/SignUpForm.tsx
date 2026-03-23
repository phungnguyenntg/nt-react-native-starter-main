import React, { useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { COLORS } from '../../theme/color';

const schema = yup.object({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
  confirmPassword: yup.string().required('Please confirm your password'),
});

type FormData = {
  username: string;
  password: string;
  confirmPassword: string;
};


const SignUpForm = () => {
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
        <View>
          <Text style={styles.inputLabel}>Confirm Password</Text>
          <Controller
            control={control}
            name="confirmPassword"
            render={({ field: { onChange, value } }) => (
              <TextInput ref={passwordRef} value={value} onChangeText={onChange} secureTextEntry returnKeyType='done' style={styles.input} />
            )}
          />
          {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword.message}</Text>}

        </View>

        <TouchableOpacity onPress={handleSubmit(onSubmit)} style={styles.signUpButton}>
          <Text style={styles.signUpButtonText}>Sign Up</Text>
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
  errorText: {
    color: 'red'
  },
  signUpButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
  },
  signUpButtonText: {
    color: '#111827',
    fontWeight: 700,
    fontSize: 16,
    textAlign: 'center',
    paddingVertical: 12,
  }
});

export default SignUpForm;