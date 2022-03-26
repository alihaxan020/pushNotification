/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Container, Text} from '../../components';
import {icons} from '../../constants';
import {useTheme} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
const Header = props => {
  const {colors} = useTheme();
  const navigation = useNavigation();
  return (
    <Container
      style={[
        styles.container,
        {
          borderBottomWidth: 0.5,
          borderBottomColor: colors.primary,
          backgroundColor: colors.card,
        },
      ]}>
      <Text style={{color: colors.primary}} isHeadingTitle>
        {props?.title}
      </Text>
      {props.notification ? (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('NotificationScreen');
          }}>
          <icons.Ionicons
            name="ios-notifications-outline"
            size={25}
            style={styles.notifications}
            color={colors.text}
          />
        </TouchableOpacity>
      ) : null}
    </Container>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    height: 60,
    width: '100%',
    paddingLeft: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
  },
  currentLocation: {
    fontSize: 16,
    fontWeight: '800',
  },
  notifications: {
    paddingRight: 20,
  },
});
