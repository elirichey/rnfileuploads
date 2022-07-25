import React from 'react';
import {StyleSheet, View, Text, Switch} from 'react-native';

export default function SwitchInput(props) {
  const {label, label2, value, onChange, fixedHeight, editable} = props;
  const styles = stylesWithProps();

  let hasSetheight = {};
  fixedHeight ? (hasSetheight.height = fixedHeight) : (hasSetheight = 40);

  return (
    <View style={{...styles.input_container, ...hasSetheight}}>
      {label ? (
        <View style={styles.input_title_container}>
          <Text style={styles.title_txt}>{label.toUpperCase()}</Text>
        </View>
      ) : null}

      <Switch
        trackColor={{false: '#EDE', true: '#EDE'}}
        thumbColor={value ? '#0D0' : '#00BFFF'}
        ios_backgroundColor="#EDE"
        onValueChange={onChange}
        style={{transform: [{scaleX: 0.75}, {scaleY: 0.75}]}}
        value={value}
        disabled={!editable}
      />

      {label2 ? (
        <View style={styles.input_title_container}>
          <Text style={styles.title_txt}>{label2.toUpperCase()}</Text>
        </View>
      ) : null}
    </View>
  );
}

const stylesWithProps = props => {
  return StyleSheet.create({
    input_container: {
      width: '100%',
      borderColor: '#DDD',
      borderBottomWidth: 1,
      position: 'relative',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingBottom: 15,
    },
    input_title_container: {
      alignItems: 'center',
      paddingHorizontal: 10,
    },
    title_txt: {
      color: '#001',
      fontWeight: '500',
      letterSpacing: 1,
    },
    opacity_low: {
      opacity: 0.5,
    },
  });
};
