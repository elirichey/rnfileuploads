import React from 'react';
import {StyleSheet, View, Image, Text} from 'react-native';

export default function Loader(props) {
  const {progress} = props;
  return (
    <View style={styles.loading_container}>
      <Text style={styles.loading_txt}>UPLOADING</Text>

      <View style={styles.loading_img_container}>
        <Image
          source={require('../../assets/gif/loaders/loader-white.gif')}
          style={styles.loading_img}
        />
        <View style={styles.loading_percentage}>
          <Text style={styles.loading_percentage_txt}>{progress}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  loading_container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loading_txt: {
    fontSize: 21,
    fontWeight: '500',
    letterSpacing: 1,
    height: 30,
    color: '#FFF',
    marginBottom: 10,
  },
  loading_img_container: {
    position: 'relative',
    height: 100,
    width: 100,
    marginBottom: 90,
  },
  loading_img: {
    height: 100,
    width: 100,
    opacity: 0.25,
  },
  loading_percentage: {
    height: 100,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
  },
  loading_percentage_txt: {
    fontSize: 21,
    fontWeight: '500',
    color: '#FFF',
  },
});
