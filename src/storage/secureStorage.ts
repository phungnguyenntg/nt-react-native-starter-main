import * as Keychain from 'react-native-keychain';

const TOKEN_KEY = 'auth_token';

export const saveToken = async (token: string) => {
  try {
    await Keychain.setGenericPassword(TOKEN_KEY, token);
  } catch (error) {
    console.error('Save token error', error);
  }
};

export const getToken = async (): Promise<string | null> => {
  try {
    const credentials = await Keychain.getGenericPassword();
    return credentials ? credentials.password : null;
  } catch (error) {
    console.error('Get token error', error);
    return null;
  }
};

export const removeToken = async () => {
  try {
    await Keychain.resetGenericPassword();
  } catch (error) {
    console.error('Remove token error', error);
  }
};