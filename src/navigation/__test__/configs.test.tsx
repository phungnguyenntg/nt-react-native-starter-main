import { bottomTabOptions, tabBarLabelStyle } from '../configs';

describe('bottomTabOptions', () => {
  it('should have headerShown set to false', () => {
    expect(bottomTabOptions.headerShown).toBe(false);
  });

  it('should have correct active and inactive tint colors', () => {
    expect(bottomTabOptions.tabBarActiveTintColor).toBe('#0DF2F2');
    expect(bottomTabOptions.tabBarInactiveTintColor).toBe('#94A3B8');
  });

  it('should have correct tabBarStyle', () => {
    expect(bottomTabOptions.tabBarStyle).toEqual({
      height: 60,
      paddingBottom: 5,
    });
  });

  it('should have correct tabBarLabelStyle', () => {
    expect(bottomTabOptions.tabBarLabelStyle).toEqual(tabBarLabelStyle);
    expect(tabBarLabelStyle).toEqual({
      fontSize: 10,
      fontWeight: '500',
    });
  });
});