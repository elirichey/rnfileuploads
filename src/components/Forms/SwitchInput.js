import React from 'react';
import {StyleSheet, View, Text, Platform, Switch} from 'react-native';
import {brandColors} from '../../config/theme';

export default function SwitchInput(props) {
  const {label, value, onChange, darkMode, error, fixedHeight} = props;
  const styles = stylesWithProps();

  const trackColor = {
    light: {false: brandColors.medium, true: brandColors.gray},
    dark: {false: brandColors.medium, true: brandColors.white},
  };
  // Inside part
  const thumbColor = {
    light: value ? brandColors.green : brandColors.borderBlue,
    dark: value ? brandColors.dk_green : brandColors.blue,
  };

  let hasSetheight = {};
  fixedHeight ? (hasSetheight.height = fixedHeight) : (hasSetheight = null);

  return (
    <View style={{...styles.input_container, ...hasSetheight}}>
      <View style={styles.input_title_container}>
        <Text style={!error ? styles.title_txt : styles.error_txt}>
          {label}
        </Text>
      </View>

      <Switch
        trackColor={darkMode ? trackColor.dark : trackColor.light}
        thumbColor={darkMode ? thumbColor.dark : thumbColor.light}
        ios_backgroundColor={darkMode ? brandColors.gray : brandColors.lighter}
        onValueChange={onChange}
        style={{transform: [{scaleX: 0.75}, {scaleY: 0.75}]}}
        value={value}
      />
    </View>
  );
}

const stylesWithProps = props => {
  return StyleSheet.create({
    input_container: {
      paddingTop: 20,
      borderColor: '#DDD',
      borderBottomWidth: 1,
      position: 'relative',
      flexDirection: 'row',
      alignItems: 'center',
      paddingBottom: 17.5,
    },
    input_title_container: {
      paddingTop: 5,
      alignItems: 'center',
      paddingRight: 10,
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
  });
};
