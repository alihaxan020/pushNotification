import {StyleSheet} from 'react-native';
import React from 'react';
import {Container, Text} from '../../components';
const NotificationScreen = () => {
  return (
    <Container style={styles.container}>
      <Text>All app notification will show here</Text>
    </Container>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
