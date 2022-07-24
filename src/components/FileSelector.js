import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';

export default function FileSelector(props) {
  const {file, action} = props;

  return (
    <TouchableOpacity
      style={styles.main}
      onPress={action ? action : null}
      disabled={!action}>
      <Image
        style={styles.event_selector_indicator_preview}
        // source={imgSrc}
        defaultSource={require('../../../assets/images/placeholders/avatar.png')}
        borderRadius={40}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#000000',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
});
