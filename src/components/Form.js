import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import Input from './Forms/Input';
import SelectDropdown from './Forms/SelectDropdown';
import SwitchInput from './Forms/SwitchInput';

export default function Form(props) {
  // Redux
  const {
    usePicker,
    client, // 'Axios' || 'Background Uploader' || 'RNFS'
    url,
    route,
    reqType,
    fieldName,
    headerToken,
    uploadQueue,
    uploadProgress,
    showHttpClientOptions,
    showHttpReqTypeOptions,
  } = props;
  // Actions
  const {
    setUsePicker,
    resetHTTPReducer,
    setHttpClient,
    setHttpUrl,
    setHttpRoute,
    setHttpReqType,
    setHttpFieldName,
    setHttpHeaderToken,
    resetUploadsReducer,
    updateUploadQueue,
    clearUploadQueue,
    updateUploadQueueProgress,
    submitUpload,
    setShowHttpClientOptions,
    setShowHttpReqTypeOptions,
  } = props;

  return (
    <View style={styles.form_container}>
      <View style={[styles.row]}>
        <SwitchInput
          label="File"
          label2="Image"
          value={usePicker}
          onChange={() => setUsePicker(!usePicker)}
          fixedHeight={60}
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
          autoCapitalize={false}
          returnKeyType="next"
          editable={true}
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
          autoCapitalize={false}
          returnKeyType="next"
          editable={true}
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
              editable={true}
              showOptions={showHttpReqTypeOptions}
              setShowOptions={setShowHttpReqTypeOptions}
              theme={usePicker}
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
              editable={true}
              showOptions={showHttpClientOptions}
              setShowOptions={setShowHttpClientOptions}
              theme={usePicker}
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
          autoCapitalize={false}
          returnKeyType="next"
          editable={true}
        />
      </View>

      <View style={[styles.row]}>
        <Input
          label="Header Token:"
          value={headerToken}
          onChange={setHttpHeaderToken}
          onBlur={null}
          placeholder='Do not include: "Bearer"'
          keyboardType="default"
          autoCorrect={false}
          autoCapitalize={false}
          returnKeyType="next"
          editable={true}
        />
      </View>

      <View style={[styles.row, styles.mt_20]}>
        <TouchableOpacity>
          <Text>SUBMIT</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
  mt_20: {
    marginTop: 20,
  },
  ml10: {
    marginLeft: 10,
  },
  mr10: {
    marginRight: 10,
  },
  dropdown_row: {
    zIndex: 10,
  },
});
