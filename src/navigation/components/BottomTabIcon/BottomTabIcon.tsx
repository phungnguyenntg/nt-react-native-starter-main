import React from 'react';
import { View } from 'react-native';
import { BottomTabIconProps } from './BottomTabIconProps';

const BottomTabIcon: React.FC<BottomTabIconProps> = ({
  focused,
  ActiveIcon,
  InactiveIcon,
  size = 24,
}) => {
  const IconComponent = focused ? ActiveIcon : InactiveIcon;

  return (
    <View>
      <IconComponent width={size} height={size} />
    </View>
  );
};

export default BottomTabIcon;