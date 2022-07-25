import React from 'react';
import {StyleSheet, View, Text, Platform} from 'react-native';

const ToastConfig = {
  created: ({text1, text2, props}) => {
    const styles = stylesWithProps();
    return (
      <View style={[styles.custom_container, styles.created_border]}>
        {text1 ? (
          <Text style={[styles.title_txt, styles.theme_txt]}>{text1}</Text>
        ) : null}
        {text2 ? (
          <Text style={styles.body_txt}>{text2.toUpperCase()}</Text>
        ) : null}
      </View>
    );
  },
  updated: ({text1, text2, props}) => {
    const styles = stylesWithProps();
    return (
      <View style={[styles.custom_container, styles.updated_border]}>
        {text2 && text2.code ? (
          <Text style={[styles.title_txt, styles.theme_txt]}>{text2.code}</Text>
        ) : null}
        {text2 && text2.message ? (
          <Text style={styles.body_txt}>{text2.message.toUpperCase()}</Text>
        ) : null}
      </View>
    );
  },
  error: ({text1, text2, props}) => {
    const styles = stylesWithProps();
    return (
      <View style={[styles.custom_container, styles.error_border]}>
        {text2 && text2.code ? (
          <Text style={[styles.title_txt, styles.theme_txt]}>{text2.code}</Text>
        ) : null}
        {text2 && text2.message ? (
          <Text style={styles.body_txt}>{text2.message.toUpperCase()}</Text>
        ) : null}
      </View>
    );
  },
};

const stylesWithProps = props => {
  return StyleSheet.create({
    custom_container: {
      minHeight: 60,
      width: 240,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#FFF',
      borderRadius: 10,
      marginTop: Platform.OS === 'android' ? 0 : 20,
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.75,
      shadowRadius: 5,
      paddingHorizontal: 20,
      marginHorizontal: 20,
      overflow: 'hidden',
    },

    title_txt: {
      // fontFamily: brandFonts.semi_bold,
      // fontSize: fontSize.p,
      marginVertical: 2.5,
    },
    body_txt: {
      // fontFamily: brandFonts.semi_bold,
      // fontSize: fontSize.small,
      color: '#001',
      textAlign: 'center',
      // lineHeight: fontSize.p + 2,
      width: '100%',
      marginBottom: 5,
    },

    created_border: {
      borderColor: 'green',
      borderWidth: 1,
    },
    updated_border: {
      borderColor: 'green',
      borderWidth: 1,
    },
    error_border: {
      borderColor: 'red',
      backgroundColor: '#FFF',
      borderWidth: 1,
    },

    theme_txt: {
      color: '#001',
    },
    white_txt: {
      color: '#FFF',
    },
  });
};

export default ToastConfig;

export const toastCreated = text2 => {
  return {
    type: 'created',
    text1: 'CREATED',
    text2,
    visibilityTime: 2000,
  };
};
export const toastUpdated = text2 => {
  return {
    type: 'updated',
    text1: 'UPDATED',
    text2,
    visibilityTime: 2000,
  };
};
export const toastError = text2 => {
  return {
    type: 'error',
    text1: 'ERROR',
    text2,
    visibilityTime: 2000,
  };
};
