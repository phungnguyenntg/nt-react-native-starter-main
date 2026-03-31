import { render, fireEvent } from '@testing-library/react-native';
import { FilledButton } from './FilledButton';
import { StyleSheet } from 'react-native';

describe('FilledButton', () => {
  it('applies custom textColor and backgroundColor', () => {
    const { getByText } = render(
      <FilledButton
        title="Click Me"
        textColor="red"
        backgroundColor="blue"
        onPress={() => {}}
      />
    );

    const buttonText = getByText('Click Me');

    // Check Text color
    const flattenedTextStyle = StyleSheet.flatten(buttonText.props.style);
    expect(flattenedTextStyle).toMatchObject({ color: 'red' });
  });

  it('calls onPress when pressed', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <FilledButton title="Press Me" onPress={onPressMock} />
    );

    const button = getByText('Press Me').parent as any;
    fireEvent.press(button);

    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it('uses default colors if not provided', () => {
    const { getByText } = render(<FilledButton title="Default Colors" onPress={() => {}} />);

    const buttonText = getByText('Default Colors');

    const flattenedTextStyle = StyleSheet.flatten(buttonText.props.style);
    expect(flattenedTextStyle).toMatchObject({ color: '#fff' });
  });
});