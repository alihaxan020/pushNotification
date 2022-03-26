import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SettingScreen} from '../../screens/Setting';
const Stack = createNativeStackNavigator();
const SettingStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="SettingScreen" component={SettingScreen} />
    </Stack.Navigator>
  );
};

export default SettingStack;
