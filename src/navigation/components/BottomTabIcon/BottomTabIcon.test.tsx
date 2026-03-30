import React from 'react';
import { render } from '@testing-library/react-native';
import { Text } from 'react-native';
import BottomTabIcon from './BottomTabIcon';

describe('BottomTabIcon', () => {
  const ActiveIcon = (props: any) => (
    <Text testID="active-icon">
      Active-{props.width}-{props.height}
    </Text>
  );

  const InactiveIcon = (props: any) => (
    <Text testID="inactive-icon">
      Inactive-{props.width}-{props.height}
    </Text>
  );

  it('renders ActiveIcon when focused is true', () => {
    const { getByTestId, queryByTestId } = render(
      <BottomTabIcon
        focused={true}
        ActiveIcon={ActiveIcon}
        InactiveIcon={InactiveIcon}
      />
    );

    expect(getByTestId('active-icon')).toBeTruthy();
    expect(queryByTestId('inactive-icon')).toBeNull();
  });

  it('renders InactiveIcon when focused is false', () => {
    const { getByTestId, queryByTestId } = render(
      <BottomTabIcon
        focused={false}
        ActiveIcon={ActiveIcon}
        InactiveIcon={InactiveIcon}
      />
    );

    expect(getByTestId('inactive-icon')).toBeTruthy();
    expect(queryByTestId('active-icon')).toBeNull();
  });

  it('passes the correct size to the icon', () => {
    const { getByText } = render(
      <BottomTabIcon
        focused={true}
        ActiveIcon={ActiveIcon}
        InactiveIcon={InactiveIcon}
        size={32}
      />
    );

    expect(getByText('Active-32-32')).toBeTruthy();
  });

  it('uses default size of 24 when size is not provided', () => {
    const { getByText } = render(
      <BottomTabIcon
        focused={true}
        ActiveIcon={ActiveIcon}
        InactiveIcon={InactiveIcon}
      />
    );

    expect(getByText('Active-24-24')).toBeTruthy();
  });
});