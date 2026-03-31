import React from 'react';
import { render } from '@testing-library/react-native';
import { Text } from 'react-native';
import KeyFeature from './KeyFeature';

describe('KeyFeature', () => {
  const mockProps = {
    icon: <Text testID="mock-icon">ICON</Text>,
    title: 'Battery',
    value: '48 Hours',
  };

  it('renders title and value correctly', () => {
    const { getByText } = render(<KeyFeature {...mockProps} />);

    expect(getByText('Battery')).toBeTruthy();
    expect(getByText('48 Hours')).toBeTruthy();
  });

  it('renders icon', () => {
    const { getByTestId } = render(<KeyFeature {...mockProps} />);

    expect(getByTestId('mock-icon')).toBeTruthy();
  });
});