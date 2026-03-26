import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import HomeRightHeader from '../src/screens/components/HomeRightHeader';

jest.mock('../src/screens/components/IconButton', () => {
  return ({ onPress }: any) => {
    const { TouchableOpacity, Text } = require('react-native');
    return (
      <TouchableOpacity onPress={onPress} testID="icon-button">
        <Text>Button</Text>
      </TouchableOpacity>
    );
  };
});

describe('HomeRightHeader', () => {
  it('renders two icon buttons', () => {
    const { getAllByTestId } = render(<HomeRightHeader />);

    const buttons = getAllByTestId('icon-button');
    expect(buttons.length).toBe(2);
  });

  it('calls onPress when buttons are pressed', () => {
    const logSpy = jest.spyOn(console, 'log');

    const { getAllByTestId } = render(<HomeRightHeader />);
    const buttons = getAllByTestId('icon-button');

    fireEvent.press(buttons[0]);
    fireEvent.press(buttons[1]);

    expect(logSpy).toHaveBeenCalledTimes(2);
  });
});