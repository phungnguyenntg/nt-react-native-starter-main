import { Text } from "react-native";
import { styles } from "./TermText.styles";

export const TermsText = () => {
  return (
    <Text style={styles.text}>
      By continuing, you agree to our{' '}
      <Text style={styles.link} onPress={() => console.log('Terms')}>
        Terms of Service
      </Text>{' '}
      and{' '}
      <Text style={styles.link} onPress={() => console.log('Privacy')}>
        Privacy Policy
      </Text>
      .
    </Text>
  );
};