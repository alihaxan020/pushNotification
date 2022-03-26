import {StyleSheet, Button, Image, TextInput, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Container, Text, Header} from '../../components';
import {icons, COLORS} from '../../constants';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {TouchableOpacity} from 'react-native-gesture-handler';
import RNFS from 'react-native-fs';
import DocumentPicker from 'react-native-document-picker';
import {
  GDrive,
  MimeTypes,
  ListQueryBuilder,
} from '@robinbobin/react-native-google-drive-api-wrapper';
import {useTheme} from '@react-navigation/native';
GoogleSignin.configure({
  // Mandatory method to call before calling signIn()
  scopes: [
    'https://www.googleapis.com/auth/drive',
    'https://www.googleapis.com/auth/drive.file',
    'https://www.googleapis.com/auth/drive.appdata',
    'https://www.googleapis.com/auth/drive.metadata',
    'https://www.googleapis.com/auth/drive.readonly',
    'https://www.googleapis.com/auth/drive.metadata.readonly',
    'https://www.googleapis.com/auth/drive.apps.readonly',
    'https://www.googleapis.com/auth/drive.photos.readonly',
  ],
  webClientId:
    '570026473519-rshrqg7c8kng06b3t1644jh8h15skuvc.apps.googleusercontent.com',
  offlineAccess: true,
});

const UploadFilesScreen = () => {
  const {colors} = useTheme();
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [imageShow, setImageShow] = useState();
  const [network, setNetwork] = useState('');

  // State Defination
  const [loading, setLoading] = useState(false);
  const [filePath, setFilePath] = useState({});
  const [inputTextValue, setInputTextValue] = useState({
    folderName: '',
    txtFile: '',
  });
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  async function onGoogleButtonPress() {
    // Get the users ID token
    const {idToken} = await GoogleSignin.signIn();
    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  }
  const signOut = async () => {
    try {
      await GoogleSignin.signOut();
      setUser(null); // Remember to remove the user from your app's state as well
    } catch (error) {
      console.error(error);
    }
  };

  const gdrive = new GDrive();
  const _chooseFile = async () => {
    // Opening Document Picker to select one file
    try {
      const fileDetails = await DocumentPicker.pick({
        // Provide which type of file you want user to pick
        type: [DocumentPicker.types.images],
      });
      // Setting the state for selected File
      setFilePath(fileDetails[0]);
    } catch (error) {
      setFilePath({});
      // If user canceled the document selection
      // eslint-disable-next-line no-alert
      alert(
        DocumentPicker.isCancel(error)
          ? 'Canceled'
          : `Unknown Error: ${JSON.stringify(error)}`,
      );
    }
  };

  const _uploadDriveDataImage = async () => {
    try {
      // Check if file selected
      if (Object.keys(filePath).length == 0)
        return alert('Please Select any File');
      setLoading(true);
      let fileContent = await RNFS.readFile(filePath.uri, 'base64');
      let token = await GoogleSignin.getTokens();
      console.log('token==>', token);
      gdrive.accessToken = token.accessToken;
      gdrive.fetchCoercesTypes = true;
      gdrive.fetchRejectsOnHttpErrors = true;
      gdrive.fetchTimeout = 3000;
      let result = await gdrive.files
        .newMultipartUploader()
        .setIsBase64(true)
        .setData(fileContent, `${filePath.type}`)
        .setRequestBody({
          name: filePath.name,
          parents: ['root'],
        })
        .execute();
      console.log('result ===>', result);
      setFilePath({});
      const list = await gdrive.files.list({
        fields: 'files/id,files/name',
        q: new ListQueryBuilder().in('root', 'parents'),
      });
      console.log('list===>', list);
    } catch (error) {
      console.log('Error->', error);
    }
    setLoading(false);
  };
  // create folder in google drive
  const CreateFolder = async () => {
    try {
      // Check if file selected
      if (!inputTextValue.folderName)
        return alert('Please Enter your folder name above');
      setLoading(true);
      // Create Directory on Google Device
      let token = await GoogleSignin.getTokens();
      gdrive.accessToken = token.accessToken;
      gdrive.fetchCoercesTypes = true;
      gdrive.fetchRejectsOnHttpErrors = true;
      gdrive.fetchTimeout = 3000;
      let res = await gdrive.files
        .newMetadataOnlyUploader()
        .setRequestBody({
          name: inputTextValue.folderName,
          mimeType: MimeTypes.FOLDER,
          parents: ['root'],
        })
        .execute();
      console.log('res create folder==>', res);

      const url = await gdrive.files.get('18z7Ifp92txhigwDfxrmieXfGcIVhJx86', {
        alt: 'media',
      });
      console.log('URL==>', url);
      setInputTextValue({...inputTextValue, folderName: ''});
      var blobs = url._bodyBlob;
      setImageShow(blobs);
    } catch (error) {
      console.log('Error Create Folder->', error);
    }
    setLoading(false);
  };

  // Upload txt file  in google drive
  const uploadFile = async () => {
    try {
      // Check if file selected
      if (!inputTextValue.txtFile)
        return alert('Please Enter your folder name above');
      setLoading(true);
      // Create Directory on Google Device
      let token = await GoogleSignin.getTokens();
      gdrive.accessToken = token.accessToken;
      gdrive.fetchCoercesTypes = true;
      gdrive.fetchRejectsOnHttpErrors = true;
      gdrive.fetchTimeout = 3000;
      let fileName = inputTextValue.txtFile + '.txt';
      let res = await gdrive.files
        .newMultipartUploader()
        .setData(fileName, MimeTypes.TEXT)
        .setRequestBody({
          name: fileName,
        })
        .execute();
      console.log('text file===>', res);
      setInputTextValue({...inputTextValue, txtFile: ''});
    } catch (error) {
      console.log('Error Create Folder->', error);
    }
    setLoading(false);
  };
  // empty google drive trash

  const emptyTrash = async () => {
    let token = await GoogleSignin.getTokens();
    gdrive.accessToken = token.accessToken;
    let res = await gdrive.files.emptyTrash();
    console.log(res);

    return alert('Trash emptied');
  };
  console.log('Show Image===>', imageShow);
  if (!user) {
    return (
      <Container>
        <Text>Login</Text>
        <Button
          title="Google Sign-In"
          onPress={() =>
            onGoogleButtonPress().then(() =>
              console.log('Signed in with Google!'),
            )
          }
        />
      </Container>
    );
  }

  return (
    <React.Fragment>
      <Header title={`Welcome ${user.displayName}`} />
      <ScrollView>
        <Container style={styles.container}>
          <Container style={styles.userInfo}>
            <Text isCenter isHeadingTitle hasMargin>
              Welcome {user.displayName}
            </Text>
            <Image source={{uri: user.photoURL}} style={styles.userAvatar} />
            <TouchableOpacity
              style={styles.btnSignOut}
              onPress={() => signOut()}>
              <Text isCenter isHeadingTitle>
                SIGN OUT
              </Text>
              <icons.Octicons
                name="sign-out"
                size={20}
                color={COLORS.primary}
                style={styles.iconStyle}
              />
            </TouchableOpacity>
          </Container>

          <Container style={styles.container}>
            <Text style={styles.titleText}>Create Folder in Google Drive</Text>
            <Container style={[styles.container, {alignItems: 'center'}]}>
              <TextInput
                style={[styles.inputStyle, {color: colors.text}]}
                placeholder="Please enter your folder name.."
                placeholderTextColor={colors.border}
                onChangeText={input =>
                  setInputTextValue({...inputTextValue, folderName: input})
                }
                value={inputTextValue.folderName}
              />
              <TouchableOpacity
                style={[styles.buttonStyle, {backgroundColor: colors.card}]}
                onPress={CreateFolder}>
                <Text>Create Folder</Text>
              </TouchableOpacity>
              <Container style={styles.deviderContainer}>
                <Container style={styles.devider} />
                <Text>OR</Text>
                <Container style={styles.devider} />
              </Container>
              <Text style={styles.titleText}>
                Create text file in Google Drive
              </Text>
              <TextInput
                style={[styles.inputStyle, {color: colors.text}]}
                placeholder="Please enter your text file name.."
                placeholderTextColor={colors.border}
                onChangeText={input =>
                  setInputTextValue({...inputTextValue, txtFile: input})
                }
                value={inputTextValue.txtFile}
              />
              <TouchableOpacity
                style={[styles.buttonStyle, {backgroundColor: colors.card}]}
                onPress={uploadFile}>
                <Text>Create txt file</Text>
              </TouchableOpacity>
              <Container style={styles.deviderContainer}>
                <Container style={styles.devider} />
                <Text>OR</Text>
                <Container style={styles.devider} />
              </Container>
              <Text style={styles.titleText}>
                Choose File and Upload to Google Drive
              </Text>
              <Image
                source={{
                  uri: filePath.uri
                    ? filePath.uri
                    : 'https://www.linkpicture.com/q/LPic622eedae6096f2073574683.png',
                }}
                style={styles.previewImage}
              />
              <TouchableOpacity
                activeOpacity={0.5}
                style={[styles.buttonStyle, {backgroundColor: colors.card}]}
                onPress={_chooseFile}>
                <Text style={styles.textStyleWhite}>
                  {filePath.uri ? filePath.name : 'Choose Image'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonStyle}
                onPress={_uploadDriveDataImage}>
                <Text style={styles.textStyleWhite}>uploadDriveDataImage</Text>
              </TouchableOpacity>
            </Container>

            <Container style={styles.trashContainer}>
              <Container style={styles.deviderContainer}>
                <Container style={styles.devider} />
                <Text>OR</Text>
                <Container style={styles.devider} />
              </Container>
              <TouchableOpacity
                style={[styles.btnSignOut, {backgroundColor: 'red'}]}
                onPress={() => emptyTrash()}>
                <Text isCenter isHeadingTitle>
                  EMPTY TRASH GOOGLE DRIVE
                </Text>
                <icons.Octicons
                  name="trash"
                  size={20}
                  color={colors.text}
                  style={{paddingLeft: 5}}
                />
              </TouchableOpacity>
            </Container>
          </Container>
        </Container>
      </ScrollView>
    </React.Fragment>
  );
};

export default UploadFilesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userInfo: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingVertical: 10,
  },
  userAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  btnSignOut: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    width: '70%',
    borderRadius: 10,
  },
  titleText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 10,
  },
  imageStyle: {
    width: 20,
    height: 30,
    resizeMode: 'contain',
  },
  buttonStyle: {
    alignItems: 'center',
    padding: 10,
    width: 300,
    marginVertical: 20,
    borderRadius: 10,
    backgroundColor: 'green',
  },
  footerHeading: {
    fontSize: 18,
    textAlign: 'center',
  },
  footerText: {
    fontSize: 16,
    textAlign: 'center',
  },
  deviderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },
  devider: {
    width: 150,
    height: 1,
    marginHorizontal: 16,
    backgroundColor: 'grey',
  },
  inputStyle: {
    height: 40,
    width: 300,
    borderColor: 'grey',
    borderWidth: 1,
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
  iconStyle: {paddingLeft: 5},
  trashContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  previewImage: {
    width: 200,
    height: 250,
    resizeMode: 'contain',
    borderRadius: 10,
  },
});
