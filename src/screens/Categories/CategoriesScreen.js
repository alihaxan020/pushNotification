import {StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {Container, Text, Header} from '../../components';
import {icons, COLORS} from '../../constants';
const CategoriesScreen = ({navigation}) => {
  return (
    <React.Fragment>
      <Container style={styles.container}>
        <Header title="Categories" />
        <Text isCenter hasMargin>
          Categories Tasks Screen
        </Text>
        <TouchableOpacity
          style={styles.btnStyle}
          onPress={() => navigation.navigate('UploadFilesScreen')}>
          <icons.Ionicons
            name="md-cloud-upload-sharp"
            size={30}
            color={COLORS.primary}
          />
          <Text isHeadingTitle>1: Upload Files To Google Drive</Text>
          <icons.MaterialIcons
            name="navigate-next"
            size={30}
            color={COLORS.primary}
          />
        </TouchableOpacity>
      </Container>
    </React.Fragment>
  );
};

export default CategoriesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  btnStyle: {
    width: '90%',
    borderWidth: 0.5,
    borderColor: 'red',
    paddingVertical: 15,
    marginVertical: 10,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
