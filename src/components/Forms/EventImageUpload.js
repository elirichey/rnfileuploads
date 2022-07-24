import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';

export default function EventImageUpload(props) {
  const {source, value, isUpdating, label, error, onPress, editable} = props;

  const styles = stylesWithProps();

  let src_url;
  if (value) {
    if (isUpdating) {
      if (editable) {
        // Exists, Editing
        if (value === source) src_url = {uri: value}; // Not Updated
        else src_url = {uri: value.path}; // Updated
      } else {
        src_url = {uri: value}; // Exists, Not Editing
      }
    } else {
      if (value === source) src_url = {uri: value}; // Not Updated
      else src_url = {uri: value.path}; // New Event
    }
  }

  return (
    <View style={styles.container}>
      <>
        <View
          style={
            !editable
              ? [styles.input_title_container, styles.opacity_low]
              : styles.input_title_container
          }>
          <Text style={!error ? styles.title_txt : styles.error_txt}>
            {label}
          </Text>
        </View>
      </>

      {editable && onPress ? (
        <TouchableOpacity
          onPress={onPress}
          style={
            value && value !== '' ? styles.input_image : styles.add_image_btn
          }>
          {value && value !== '' ? (
            <Image
              style={styles.cover_img}
              source={src_url}
              defaultSource={require('../../assets/images/placeholders/placeholder.jpg')}
            />
          ) : (
            <Text style={[styles.title_txt, styles.btn_txt]}>SELECT IMAGE</Text>
          )}
        </TouchableOpacity>
      ) : (
        <>
          {value && value !== '' ? (
            <View
              style={
                value && value !== ''
                  ? styles.input_image
                  : styles.add_image_btn
              }>
              <Image
                style={styles.cover_img}
                source={src_url}
                defaultSource={require('../../assets/images/placeholders/placeholder.jpg')}
              />
            </View>
          ) : (
            <View style={styles.add_image_btn}>
              <Text style={[styles.title_txt, styles.btn_txt]}>NO IMAGE</Text>
            </View>
          )}
        </>
      )}
    </View>
  );
}

const stylesWithProps = props => {
  const winSize = Dimensions.get('window');

  return StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 20,
      marginBottom: 10,
    },
    input_title_container: {
      flexDirection: 'row',
      marginBottom: 10,
    },
    title_txt: {
      height: Platform.OS === 'ios' ? 12 : 16,
      marginBottom: 5,
    },
    opacity_low: {
      opacity: 0.5,
    },
    error_txt: {
      height: Platform.OS === 'ios' ? 12 : 16,
      color: '#DD0000',
      marginBottom: 5,
    },
    cover_img: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      height: winSize.width - 40,
      width: winSize.width - 40,
      overflow: 'hidden',
    },
    input_image: {
      height: winSize.width - 40,
      width: winSize.width - 40,
      backgroundColor: '#FFF',
      borderWidth: 1,
      borderColor: '#DDD',
      overflow: 'hidden',
      alignItems: 'center',
      justifyContent: 'center',
    },
    add_image_btn: {
      height: 32,
      width: 140,
      borderWidth: 1,
      borderColor: '#DDD',
      borderRadius: 19,
      overflow: 'hidden',
      alignItems: 'center',
      justifyContent: 'center',
    },
    btn_txt: {
      marginTop: 6,
      letterSpacing: 1,
    },
  });
};
