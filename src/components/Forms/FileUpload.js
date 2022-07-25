import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  ImageBackground,
} from 'react-native';

export default function FileUpload(props) {
  const {source, onPress, useImagePicker, currentUpload, uploadProgress} =
    props;

  // Image Picker
  // const {creationDate, cropRect, data, duration, exif, filename, height, localIdentifier, mime, modificationDate, path, size, sourceURL, width} = source;
  //
  // Document Picker
  // const {name, size, type, uri} = source;

  const styles = stylesWithProps();

  let name, size, type, uri;
  if (useImagePicker) {
    name = source ? source.filename : null;
    size = source ? source.size : null;
    type = source ? source.mime : null;
    uri = source ? source.sourceURL : null;
  } else {
    name = source ? source.name : null;
    size = source ? source.size : null;
    type = source ? source.type : null;
    uri = source ? source.uri : null;
  }

  return (
    <View style={styles.upload_container}>
      <TouchableOpacity
        onPress={onPress}
        style={uri ? styles.input_file : styles.add_file_btn}>
        {uri ? (
          <>
            <Image
              style={styles.cover_img}
              source={uri ? {uri: uri} : null}
              defaultSource={require('../../assets/images/placeholder.jpg')}
              resizeMethod="resize"
              resizeMode="contain"
            />

            <View style={styles.file_overview_container}>
              <Text style={styles.file_txt}>Name: {name}</Text>
              <Text style={styles.file_txt}>Size: {size}</Text>
              <Text style={styles.file_txt}>Type: {type}</Text>
              <Text style={styles.file_txt}>URI: {uri ? 'True' : 'False'}</Text>
            </View>
          </>
        ) : (
          <>
            <Text
              style={[
                styles.title_txt,
                styles.btn_txt,
              ]}>{`[ SELECT FILE ]`}</Text>

            <Text style={[styles.title_txt, styles.btn_txt]}>
              {useImagePicker ? 'Image Picker' : 'File Picker'}
            </Text>
          </>
        )}
      </TouchableOpacity>
    </View>
  );
}

const stylesWithProps = props => {
  const winSize = Dimensions.get('window');

  return StyleSheet.create({
    upload_container: {
      flex: 1,
      width: winSize.width,
      height: winSize.width,
      justifyContent: 'center',
      alignItems: 'center',
    },
    title_txt: {},
    input_file: {
      height: winSize.width - 20,
      width: winSize.width - 20,
      position: 'relative',
      backgroundColor: '#FFF',
      borderWidth: 1,
      borderColor: '#DDD',
      // overflow: 'hidden',
      // alignItems: 'center',
      // justifyContent: 'center',
    },
    add_file_btn: {
      height: winSize.width - 30,
      width: winSize.width - 30,
      position: 'relative',
      backgroundColor: '#EEE',
      overflow: 'hidden',
      alignItems: 'center',
      justifyContent: 'center',
    },
    cover_img: {
      flex: 1,
      maxWidth: winSize.width - 22,
      backgroundColor: '#EEE',
      // alignItems: 'center',
      // justifyContent: 'center',
      // height: winSize.width - 22,
      // width: winSize.width - 22,
      // overflow: 'hidden',
    },
    file_overview_container: {
      width: '100%',
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      paddingHorizontal: 20,
      paddingVertical: 10,
    },
    file_txt: {
      color: 'green',
    },
    btn_txt: {
      letterSpacing: 1,
      marginVertical: 5,
    },
  });
};
