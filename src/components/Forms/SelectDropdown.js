import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform,
  Dimensions,
} from 'react-native';
import {
  brandFonts,
  fontSize,
  determineTheme,
  brandColors,
} from '../../config/theme';

export default function SelectDropdown(props) {
  const {
    label,
    value,
    onChange,
    placeholder,
    options,
    darkMode,
    error,
    errorMessage,
    editable,
    showOptions,
    setShowOptions,
  } = props;

  const styles = stylesWithProps();

  return (
    <View style={styles.base_container}>
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

        <View style={styles.main_container}>
          {editable ? (
            <>
              <TouchableOpacity
                style={styles.selected_clickable}
                onPress={() => setShowOptions(!showOptions)}>
                <Text
                  style={
                    value !== '' && value !== '(Select)'
                      ? styles.select_txt
                      : [styles.placeholder_txt, styles.opacity_low]
                  }>
                  {value !== '' ? value : placeholder}
                </Text>

                <View
                  style={[
                    styles.selector_indicator,
                    showOptions
                      ? {
                          transform: [{rotate: '-90deg'}],
                        }
                      : null,
                  ]}>
                  <Text style={styles.indicator_txt}>«</Text>
                </View>
              </TouchableOpacity>

              {showOptions ? (
                <View
                  style={[
                    styles.list_container,
                    {
                      shadowColor: darkMode
                        ? 'rgba(255, 255, 255, 0.43)'
                        : 'rgba(0, 0, 0, 0.43)',
                      shadowOffset: {
                        width: 10,
                        height: 10,
                      },
                      shadowRadius: 10,
                    },
                  ]}
                  elevation={5}>
                  {options.map((option, i) => {
                    return (
                      <TouchableOpacity
                        style={
                          value === option
                            ? styles.select_container_active
                            : styles.select_container
                        }
                        key={i}
                        onPress={async () => {
                          await new Promise(resolve =>
                            resolve(onChange(option)),
                          );
                          setShowOptions(false);
                        }}>
                        <Text style={styles.select_txt}>{option}</Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              ) : null}
            </>
          ) : (
            <View style={styles.selected_clickable}>
              <Text
                style={
                  value !== '' ? styles.select_txt : styles.placeholder_txt
                }>
                {value !== '' ? value : placeholder}
              </Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}

const stylesWithProps = props => {
  return StyleSheet.create({
    base_container: {
      flex: 1,
    },
    input_container: {
      paddingTop: 15,
      borderColor: '#DDD',
      borderBottomWidth: 1,
      position: 'relative',
      zIndex: 5,
    },
    input_title_container: {
      flexDirection: 'row',
    },
    title_txt: {
      height: Platform.OS === 'ios' ? 12 : 16,
      marginBottom: 5,
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
      marginBottom: 5,
    },
    main_container: {
      position: 'relative',
    },
    selected_clickable: {
      height: Platform.OS === 'ios' ? 32 : 38,
      width: '100%',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
      marginBottom: Platform.OS === 'ios' ? 0 : 6,
    },
    select_container: {
      width: Dimensions.get('screen').width / 2 - 30,
      height: Platform.OS === 'ios' ? 44 : 44,
      justifyContent: 'center',
      backgroundColor: '#FFF',
      borderColor: '#DDD',
      borderBottomWidth: 1,
      overflow: 'hidden',
      paddingHorizontal: 15,
    },
    select_container_active: {
      width: Dimensions.get('screen').width / 2 - 30,
      height: Platform.OS === 'ios' ? 44 : 44,
      justifyContent: 'center',
      backgroundColor: '#0F0',
      borderColor: '#DDD',
      borderBottomWidth: 1,
      overflow: 'hidden',
      paddingHorizontal: 15,
    },

    placeholder_txt: {
      opacity: 0.5,
    },
    select_txt: {},
    list_container: {
      flex: 1,
      position: 'absolute',
      top: Platform.OS === 'ios' ? 33 : 44,
      backgroundColor: '#DDD',
      zIndex: 5,
    },

    selector_indicator: {
      position: 'absolute',
      right: 10,
      bottom: 10,
    },
    selector_indicator_open: {
      position: 'absolute',
      right: 10,
      bottom: 10,
    },
    indicator_txt: {},
  });
};
