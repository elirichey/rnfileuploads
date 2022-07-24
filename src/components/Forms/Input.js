import React from 'react';
import {StyleSheet, View, Text, TextInput} from 'react-native';

export default function Input(props) {
  const {
    label,
    value,
    onChange,
    onBlur,
    placeholder,
    keyboardType,
    autoCorrect,
    autoCapitalize,
    returnKeyType,
    editable,
  } = props;

  const styles = stylesWithProps();

  return (
    <View style={styles.input_container}>
      <View
        style={
          !editable
            ? [styles.input_title_container, styles.opacity_low]
            : styles.input_title_container
        }>
        <Text style={styles.title_txt}>{label}</Text>
      </View>

      <TextInput
        style={styles.txt_input}
        onChangeText={onChange ? x => onChange(x) : null}
        onBlur={onBlur ? x => onBlur(x) : null}
        value={value}
        placeholder={placeholder}
        keyboardType={keyboardType}
        // keyboardType: "default", 'numeric', 'email-address', "ascii-capable",
        // 'numbers-and-punctuation', 'url', 'number-pad', 'phone-pad', 'name-phone-pad',
        // * 'decimal-pad', 'twitter', 'web-search', 'visible-password'
        placeholderTextColor="#878787"
        autoCorrect={autoCorrect}
        autoCapitalize={autoCapitalize}
        returnKeyType={returnKeyType}
        secureTextEntry={false}
        editable={editable}
      />
    </View>
  );
}

const stylesWithProps = props => {
  return StyleSheet.create({
    input_container: {
      flex: 1,
      borderColor: '#DDD',
      borderBottomWidth: 1,
      position: 'relative',
    },
    input_title_container: {
      flexDirection: 'row',
    },
    title_txt: {
      fontWeight: '500',
      letterSpacing: 1,
    },
    opacity_low: {
      opacity: 0.5,
    },
    txt_input: {
      height: 40,
      overflow: 'hidden',
    },
  });
};
