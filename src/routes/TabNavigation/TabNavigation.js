import React from 'react';
import {StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  CategoriesStack,
  ProfileStack,
  HomeStack,
  SettingStack,
} from '../Stacks';
import {COLORS} from '../../constants/theme';
import {useTheme} from '@react-navigation/native';
import {Text, Container} from '../../components';
import {icons} from '../../constants';
const Tab = createBottomTabNavigator();
const TabNavigation = () => {
  const {colors} = useTheme();
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        tabBarIcon: ({focused}) => {
          switch (route.name) {
            case 'HomeStack':
              return (
                <>
                  <icons.Feather
                    name="home"
                    size={27}
                    color={focused ? colors.primary : colors.text}
                  />

                  <Text isCenter style={styles.textStyle}>
                    Home
                  </Text>
                </>
              );

            case 'CategoriesStack':
              return (
                <>
                  <icons.MaterialIcons
                    color={focused ? colors.primary : colors.text}
                    size={27}
                    name="category"
                  />
                  <Text isCenter style={styles.textStyle}>
                    Category
                  </Text>
                </>
              );
            case 'SettingStack':
              return (
                <>
                  <icons.MaterialCommunityIcons
                    name="cart-check"
                    size={27}
                    color={focused ? colors.primary : colors.text}
                  />

                  <Text isCenter style={styles.textStyle}>
                    Cart
                  </Text>
                </>
              );
            case 'ProfileStack':
              return (
                <>
                  <icons.Ionicons
                    name="person-sharp"
                    size={27}
                    color={focused ? colors.primary : colors.text}
                  />

                  <Text isCenter style={styles.textStyle}>
                    Account
                  </Text>
                </>
              );
            default:
              break;
          }
        },
      })}>
      <Tab.Screen name="HomeStack" component={HomeStack} />
      <Tab.Screen name="CategoriesStack" component={CategoriesStack} />
      <Tab.Screen name="SettingStack" component={SettingStack} />
      <Tab.Screen name="ProfileStack" component={ProfileStack} />
    </Tab.Navigator>
  );
};

export default TabNavigation;

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 12,
  },
});
