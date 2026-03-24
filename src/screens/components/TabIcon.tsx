import React from 'react';
import { View } from 'react-native';

interface TabIconProps {
  focused: boolean;
  ActiveIcon: React.FC<any>;
  InactiveIcon: React.FC<any>;
  size?: number;
}

const TabIcon: React.FC<TabIconProps> = ({
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

export default TabIcon;