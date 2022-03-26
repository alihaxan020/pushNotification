import React from 'react';
import DrawerNavigation from './src/routes/DrawerNavigation';
import {NavigationContainer} from '@react-navigation/native';
import {lightTheme, darkTheme} from './src/constants';
import {StripeProvider} from '@stripe/stripe-react-native';
const App = () => {
  return (
    <StripeProvider publishableKey="pk_test_51KYA9VCNnCwJI35CAVqXgAekF34eaIbAVOlQWeNVgcEb6YVi0NQOdMgNEdakLfKVb1p4M5U8sVXNRt3tgKl7UCs400W9Ho7TFz">
      <NavigationContainer theme={darkTheme}>
        <DrawerNavigation />
      </NavigationContainer>
    </StripeProvider>
  );
};

export default App;
