import React from 'react';
import { render } from '@testing-library/react-native';
import { LoadingOverlay } from './LoadingOverlay';
import { COLORS } from '@/theme/colors';

describe('LoadingOverlay', () => {
  it('renders ActivityIndicator when visible', () => {
    const { getByTestId } = render(
      <LoadingOverlay visible={true} />
    );

    const indicator = getByTestId('loading-indicator');
    expect(indicator).toBeTruthy();
    expect(indicator.props.color).toBe(COLORS.primary);
    expect(indicator.props.size).toBe('large');
  });

  it('does not render ActivityIndicator when not visible', () => {
    const { queryByTestId } = render(
      <LoadingOverlay visible={false} />
    );

    const indicator = queryByTestId('loading-indicator');
    expect(indicator).toBeNull();
  });
});