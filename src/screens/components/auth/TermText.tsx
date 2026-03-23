import { Text, StyleSheet } from 'react-native';

const TermsText = () => {
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

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    color: '#9CA3AF',
    fontSize: 13,
  },
  link: {
    color: '#9CA3AF',
    textDecorationLine: 'underline',
  },
});

export default TermsText;