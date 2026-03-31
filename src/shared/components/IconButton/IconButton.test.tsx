import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { IconButton } from './IconButton';
import { Text } from 'react-native';

describe('IconButton', () => {
  it('renders label and icon', () => {
    const MockIcon = <Text>ICON</Text>;

    const { getByText } = render(
      <IconButton label="Click Me" icon={MockIcon} onPress={() => {}} />
    );

    // Check if label text renders
    expect(getByText('Click Me')).toBeTruthy();

    // Check if icon renders
    expect(getByText('ICON')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const MockIcon = <Text>ICON</Text>;
    const onPressMock = jest.fn();

    const { getByText } = render(
      <IconButton label="Press Me" icon={MockIcon} onPress={onPressMock} />
    );

    const button = getByText('Press Me').parent; // TouchableOpacity wraps Text
    fireEvent.press(button!);

    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it('renders empty label if none provided', () => {
    const MockIcon = <Text>ICON</Text>;

    const { getByText } = render(
      <IconButton label="" icon={MockIcon} onPress={() => {}} />
    );

    expect(getByText('')).toBeTruthy();
    expect(getByText('ICON')).toBeTruthy();
  });
});