import React from 'react';
import {StyleSheet, View, Text, TextInput, Platform} from 'react-native';

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
    error,
    errorMessage,
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
        <Text style={!error ? styles.title_txt : styles.error_txt}>
          {label}
        </Text>

        {errorMessage ? (
          <Text style={[styles.title_txt, styles.opacity_low, styles.ml10]}>
            {errorMessage}
          </Text>
        ) : null}
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
      paddingTop: 15,
      borderColor: '#DDD',
      borderBottomWidth: 1,
      position: 'relative',
    },
    input_title_container: {
      flexDirection: 'row',
    },
    title_txt: {
      height: Platform.OS === 'ios' ? 12 : 16,
      marginBottom: Platform.OS === 'ios' ? 5 : 0,
    },
    opacity_low: {
      opacity: 0.5,
    },
    ml10: {
      marginLeft: 10,
    },
    error_txt: {
      height: Platform.OS === 'ios' ? 12 : 16,
      color: '#DD0000',
      marginBottom: Platform.OS === 'ios' ? 5 : 0,
    },
    txt_input: {
      height: Platform.OS === 'ios' ? 32 : null,
      overflow: 'hidden',
    },
  });
};
