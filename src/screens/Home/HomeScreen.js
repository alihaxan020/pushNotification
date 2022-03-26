import {StyleSheet, LogBox, TouchableOpacity, Button} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Container, Text} from '../../components';
import notifee, {AndroidImportance} from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import NetInfo from '@react-native-community/netinfo';
import {NoInternet, Header} from '../../components';
LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);
const HomeScreen = () => {
  const [network, setNetwork] = useState('');
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    unsubscribeNet();
    getFCMToken();
    requestPermission();
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('remoteMessage', JSON.stringify(remoteMessage));
      DisplayNotification(remoteMessage);
      // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });
    const unsubscribeInternect = NetInfo.addEventListener(state => {
      setNetwork(state);
    });

    return unsubscribe, unsubscribeInternect;
  }, []);

  function unsubscribeNet() {
    NetInfo.fetch().then(state => {
      setTimeout(function () {
        if (state.isConnected === true && state.isInternetReachable === true) {
          // any thing you want to load before navigate to screen
          setNetwork(state);
        } else {
          setLoading(false);
        }
      }, 1000);
    });
  }
  const getFCMToken = () => {
    messaging()
      .getToken()
      .then(token => {
        console.log('token=>>>', token);
      });
  };

  const requestPermission = async () => {
    const authStatus = await messaging().requestPermission();
  };

  async function DisplayNotification(remoteMessage) {
    // Create a channel
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
      importance: AndroidImportance.HIGH,
    });

    // Display a notification
    await notifee.displayNotification({
      title: remoteMessage.notification.title,
      body: remoteMessage.notification.body,
      android: {
        channelId,
      },
    });
  }

  async function localDisplayNotification() {
    // Create a channel
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
      importance: AndroidImportance.HIGH,
    });

    // Display a notification
    notifee.displayNotification({
      title:
        '<p style="color: #4caf50;"><b>Styled HTMLTitle</span></p></b></p> &#128576;',
      subtitle: '&#129395;',
      body: 'The <p style="text-decoration: line-through">body can</p> also be <p style="color: #ffffff; background-color: #9c27b0"><i>styled too</i></p> &#127881;!',
      android: {
        channelId,
        color: '#4caf50',
        actions: [
          {
            title: '<b>Dance</b> &#128111;',
            pressAction: {id: 'dance'},
          },
          {
            title: '<p style="color: #f44336;"><b>Cry</b> &#128557;</p>',
            pressAction: {id: 'cry'},
          },
        ],
      },
    });
  }

  const subscribeToTopic = () => {
    messaging()
      .subscribeToTopic('weather2')
      .then(() => console.log('Subscribed to topic!'));
  };

  return (
    <>
      <Header title="HomeScreen" notification={true} />
      <Container style={styles.container}>
        <TouchableOpacity onPress={localDisplayNotification}>
          <Text isCenter>Local Push Notifications</Text>
        </TouchableOpacity>
        {!network?.isConnected || !network?.isInternetReachable ? (
          <Container style={styles.netContainer}>
            <NoInternet style={styles.internetStat} />
            <Button
              title="Try Again"
              onPress={() => {
                setLoading(true);
                unsubscribeNet();
              }}
              loading={loading}
            />
          </Container>
        ) : (
          <>
            <TouchableOpacity onPress={subscribeToTopic}>
              <Text isCenter isHeadingTitle hasMargin>
                UPLOAD FILES
              </Text>
            </TouchableOpacity>
          </>
        )}
      </Container>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'center',
  },
  internetStat: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 10,
  },
  netContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
