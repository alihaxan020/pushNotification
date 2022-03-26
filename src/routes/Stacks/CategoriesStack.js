import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {CategoriesScreen, UploadFilesScreen} from '../../screens/Categories';

const Stack = createNativeStackNavigator();
const CategoriesStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="CategoriesScreen" component={CategoriesScreen} />
      <Stack.Screen name="UploadFilesScreen" component={UploadFilesScreen} />
    </Stack.Navigator>
  );
};

export default CategoriesStack;
