import React from 'react';
import {StyleSheet, View} from 'react-native';
import LottieView from 'lottie-react-native';

const NoInternet = props => {
  return (
    <View style={[styles.container, props.style]}>
      <LottieView
        source={require('../../assets/images/internet.json')}
        autoPlay
        loop
      />
    </View>
  );
};

export default NoInternet;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
});
