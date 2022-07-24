import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';

export default function FileUpload(props) {
  const {source, onPress, usePicker} = props;
  // const {name, size, type, uri} = source;
  const styles = stylesWithProps();

  return (
    <View style={styles.upload_container}>
      <TouchableOpacity
        onPress={onPress}
        style={source && source.uri ? styles.input_file : styles.add_file_btn}>
        {source && source.uri ? (
          <Image
            style={styles.cover_img}
            source={source ? {uri: source.uri} : null}
            defaultSource={require('../../assets/images/placeholder.jpg')}
          />
        ) : (
          <>
            <Text
              style={[
                styles.title_txt,
                styles.btn_txt,
              ]}>{`[ SELECT FILE ]`}</Text>

            <Text style={[styles.title_txt, styles.btn_txt]}>
              {usePicker ? 'Image Picker' : 'File Picker'}
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
    cover_img: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      height: winSize.width - 20,
      width: winSize.width - 20,
      overflow: 'hidden',
    },
    input_file: {
      height: winSize.width - 20,
      width: winSize.width - 20,
      backgroundColor: '#FFF',
      borderWidth: 1,
      borderColor: '#DDD',
      overflow: 'hidden',
      alignItems: 'center',
      justifyContent: 'center',
    },
    add_file_btn: {
      height: winSize.width - 30,
      width: winSize.width - 30,
      backgroundColor: '#EEE',
      overflow: 'hidden',
      alignItems: 'center',
      justifyContent: 'center',
    },
    btn_txt: {
      letterSpacing: 1,
      marginVertical: 5,
    },
  });
};
