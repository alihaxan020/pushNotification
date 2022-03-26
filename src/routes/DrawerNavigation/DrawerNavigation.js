import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import TabNavigation from '../TabNavigation';
const Drawer = createDrawerNavigator();
const DrawerNavigation = () => {
  return (
    <Drawer.Navigator screenOptions={{headerShown: false}}>
      <Drawer.Screen name="Tabs" component={TabNavigation} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
