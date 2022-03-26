import {StyleSheet} from 'react-native';
import React from 'react';
import {Container, Text} from '../../components';
const ProfileScreen = () => {
  return (
    <Container style={styles.container}>
      <Text>Profile Screen</Text>
    </Container>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
