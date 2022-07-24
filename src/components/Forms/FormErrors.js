import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

export default function FormErrors(props) {
  const {errors} = props;

  if (errors.length === 0) {
    return null;
  }

  return errors.map((error, i) => {
    return (
      <View style={styles.error_container} key={i}>
        <Text style={styles.error_txt}> * {error.message}</Text>
      </View>
    );
  });
}

const styles = StyleSheet.create({
  error_container: {},
  error_txt: {
    color: '#DD0000',
    fontSize: 14,
  },
});
