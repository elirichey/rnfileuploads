import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import Input from './Forms/Input';
import SelectDropdown from './Forms/SelectDropdown';
import SwitchInput from './Forms/SwitchInput';

export default function Form(props) {
  // Redux - State
  const {
    usePicker,
    client,
    url,
    route,
    reqType,
    fieldName,
    headerToken,
    currentUpload,
    uploadProgress,
    showHttpClientOptions,
    showHttpReqTypeOptions,
    submitDisabled,
    loading,
  } = props;

  // Redux - Actions
  const {
    setUsePicker,
    resetHTTPReducer,
    setHttpClient,
    setHttpUrl,
    setHttpRoute,
    setHttpReqType,
    setHttpFieldName,
    setHttpHeaderToken,
    resetUploadReducer,
    setCurrentUpload,
    setUploadProgress,
    clearUpload,
    submitUpload,
    setShowHttpClientOptions,
    setShowHttpReqTypeOptions,
  } = props;

  const styles = stylesWithProps(usePicker);
  return (
    <View style={styles.form_container}>
      <View style={[styles.row]}>
        <SwitchInput
          label="File"
          label2="Image"
          value={usePicker}
          onChange={setUsePicker}
          fixedHeight={60}
          editable={!loading}
        />
      </View>

      <View style={[styles.row]}>
        <Input
          label="URL:"
          value={url}
          onChange={setHttpUrl}
          onBlur={null}
          placeholder="http://localhost:3000"
          keyboardType="url"
          autoCorrect={false}
          autoCapitalize="none"
          returnKeyType="next"
          editable={!loading}
        />
      </View>

      <View style={[styles.row]}>
        <Input
          label="Route:"
          value={route}
          onChange={setHttpRoute}
          onBlur={null}
          placeholder="/upload"
          keyboardType="default"
          autoCorrect={false}
          autoCapitalize="none"
          returnKeyType="next"
          editable={!loading}
        />
      </View>

      <View style={[styles.row, styles.dropdown_row]}>
        <View style={[styles.column, styles.mr10]}>
          <View style={styles.row}>
            <SelectDropdown
              label="HTTP Request Type:"
              value={reqType}
              onChange={setHttpReqType}
              placeholder="( SELECT )"
              options={['PUT', 'POST']}
              showOptions={showHttpReqTypeOptions}
              setShowOptions={setShowHttpReqTypeOptions}
              theme={usePicker}
              editable={!loading}
            />
          </View>
        </View>

        <View style={[styles.column, styles.ml10]}>
          <View style={styles.row}>
            <SelectDropdown
              label="Upload Client:"
              value={client}
              onChange={setHttpClient}
              placeholder="( SELECT )"
              options={['Axios', 'Background Uploader', 'RNFS']}
              showOptions={showHttpClientOptions}
              setShowOptions={setShowHttpClientOptions}
              theme={usePicker}
              editable={!loading}
            />
          </View>
        </View>
      </View>

      <View style={[styles.row]}>
        <Input
          label="Field Name:"
          value={fieldName}
          onChange={setHttpFieldName}
          onBlur={null}
          placeholder="file"
          keyboardType="default"
          autoCorrect={false}
          autoCapitalize="none"
          returnKeyType="next"
          editable={!loading}
        />
      </View>

      <View style={[styles.row]}>
        <Input
          label="Header Token:"
          value={headerToken}
          onChange={setHttpHeaderToken}
          onBlur={null}
          placeholder='Do not include "Bearer"'
          keyboardType="default"
          autoCorrect={false}
          autoCapitalize={false}
          returnKeyType="done"
          multiline={true}
          editable={!loading}
        />
      </View>

      <View style={[styles.row, styles.mt_20]}>
        <TouchableOpacity
          onPress={submitUpload}
          style={
            submitDisabled ? styles.upload_btn_disabled : styles.upload_btn
          }
          disabled={submitDisabled}>
          <Text
            style={
              submitDisabled
                ? styles.upload_btn_txt_disabled
                : styles.upload_btn_txt
            }>
            SUBMIT
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const stylesWithProps = props => {
  return StyleSheet.create({
    form_container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      paddingHorizontal: 20,
      paddingBottom: 40,
    },
    row: {
      flexDirection: 'row',
      marginVertical: 10,
    },
    column: {
      flex: 1,
      flexDirection: 'column',
    },
    mt_20: {marginTop: 20},
    ml10: {marginLeft: 10},
    mr10: {marginRight: 10},
    dropdown_row: {zIndex: 10},
    upload_btn: {
      height: 40,
      width: 180,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 2,
      borderColor: props ? '#0D0' : '#00BFFF',
      borderRadius: 20,
    },
    upload_btn_disabled: {
      height: 40,
      width: 180,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 2,
      borderColor: '#DDD',
      borderRadius: 20,
    },
    upload_btn_txt: {
      fontWeight: '500',
      letterSpacing: 1,
      color: props ? '#002' : '#0B0',
    },
    upload_btn_txt_disabled: {
      fontWeight: '500',
      letterSpacing: 1,
      color: '#AAA',
    },
  });
};
