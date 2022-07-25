import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform,
  Dimensions,
} from 'react-native';

export default function SelectDropdown(props) {
  const {
    label,
    value,
    onChange,
    placeholder,
    options,
    editable,
    showOptions,
    setShowOptions,
    theme,
  } = props;

  const styles = stylesWithProps(theme);

  return (
    <View style={styles.base_container}>
      <View style={styles.input_container}>
        <View style={styles.input_title_container}>
          <Text style={styles.title_txt}>{label}</Text>
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
                <View style={[styles.list_container]} elevation={5}>
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
                        <Text
                          style={
                            value === option
                              ? [styles.select_txt, styles.txt_white]
                              : [styles.select_txt]
                          }>
                          {option}
                        </Text>
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
      borderColor: '#DDD',
      borderBottomWidth: 1,
      position: 'relative',
    },
    input_title_container: {
      flexDirection: 'row',
      marginBottom: 5,
    },
    title_txt: {
      color: '#001',
      fontWeight: '500',
      letterSpacing: 1,
    },
    opacity_low: {
      opacity: 0.5,
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
      backgroundColor: '#EEE',
      borderColor: '#DDD',
      borderBottomWidth: 1,
      overflow: 'hidden',
      paddingHorizontal: 15,
    },
    select_container_active: {
      width: Dimensions.get('screen').width / 2 - 30,
      height: Platform.OS === 'ios' ? 44 : 44,
      justifyContent: 'center',
      backgroundColor: props ? '#0D0' : '#00BFFF',
      borderColor: '#DDD',
      borderBottomWidth: 1,
      overflow: 'hidden',
      paddingHorizontal: 15,
    },

    placeholder_txt: {
      opacity: 0.5,
      color: '#001',
    },
    select_txt: {
      color: '#001',
    },
    txt_white: {
      color: '#FFF',
    },
    list_container: {
      flex: 1,
      backgroundColor: '#FFF',
      position: 'absolute',
      top: Platform.OS === 'ios' ? 33 : 44,
      shadowColor: 'rgba(0, 0, 0, 0.43)',
      shadowOffset: {
        width: 10,
        height: 10,
      },
      shadowRadius: 10,
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
    indicator_txt: {
      color: '#001',
    },
  });
};
