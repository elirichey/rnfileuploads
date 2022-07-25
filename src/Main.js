import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Alert,
} from 'react-native';
import {connect} from 'react-redux';
import {
  resetHTTPReducer,
  setHttpClient,
  setHttpUrl,
  setHttpRoute,
  setHttpReqType,
  setHttpFieldName,
  setHttpHeaderToken,
} from './redux/actions/http';
import {
  resetUploadReducer,
  setCurrentUpload,
  setUploadProgress,
} from './redux/actions/uploads';
import Orientation from 'react-native-orientation-locker';
import DocumentPicker from 'react-native-document-picker';
import ImagePicker from 'react-native-image-crop-picker';
import Toast from 'react-native-toast-message';
import ToastConfig, {
  toastCreated,
  toastError,
} from './components/Toast/ToastConfig';
import UploadsHTTP from './utilities/http/uploads';
// Components
import FileUpload from './components/Forms/FileUpload';
import Form from './components/Form';

function App(props) {
  // Redux
  const {client, url, route, reqType, headerToken, fieldName} = props;
  // Actions
  const {
    // resetHTTPReducer, setHttpClient, setHttpUrl, setHttpRoute, setHttpReqType, setHttpFieldName, setHttpHeaderToken
    resetUploadReducer,
    setCurrentUpload,
    setUploadProgress,
  } = props;

  useEffect(() => {
    Orientation.lockToPortrait();
    return () => null;
  }, []);

  const [selectedFile, setSelectedFile] = useState(null);
  const [useImagePicker, setUseImagePicker] = useState(true);

  const openPicker = async () => {
    if (useImagePicker) {
      return ImagePicker.openPicker({})
        .then(res => {
          console.log('Selected', res);
          setSelectedFile(res);
        })
        .catch(e => null);
    } else {
      try {
        const res = await DocumentPicker.pickSingle();
        console.log('Selected', res); // const {name, size, type, uri} = res;
        return setSelectedFile(res);
      } catch (e) {
        return console.log('Caught Error', e);
      }
    }
  };
  const resetFileSelection = () => {
    const options = [
      {text: 'Cancel', style: 'default', onPress: () => null},
      {
        text: 'Clear',
        style: 'destructive',
        onPress: () => setSelectedFile(null),
      },
    ];
    Alert.alert(
      `Clear Selected File`,
      `Are you sure you want to reset the file?`,
      options,
    );
  };

  const confirmChangeModeIfFileSelected = () => {
    if (selectedFile) {
      const options = [
        {text: 'Cancel', style: 'default', onPress: () => null},
        {
          text: 'Continue',
          style: 'destructive',
          onPress: () => {
            setUseImagePicker(!useImagePicker);
            setSelectedFile(null);
            resetUploadReducer();
          },
        },
      ];

      Alert.alert(
        `Switch File Picker`,
        `Switching file pickers will clear your current upload`,
        options,
      );
    } else {
      setUseImagePicker(!useImagePicker);
      setSelectedFile(null);
      resetUploadReducer();
    }
  };

  const [showHttpClientOptions, setShowHttpClientOptions] = useState(false);
  const [showHttpReqTypeOptions, setShowHttpReqTypeOptions] = useState(false);

  const submitUpload = async () => {
    // Image Picker Response:
    // - iOS: { creationDate, cropRect, data, duration, exif, filename,
    //          height, localIdentifier, mime, modificationDate, path,
    //          size, sourceURL, width}
    // - Android: {}
    //        more
    //
    // Document Picker Response:
    // - iOS: {}
    // - Android: {}

    // Validate the file payload
    let fileErrors = [];
    let payload = {};
    if (useImagePicker) {
      selectedFile
        ? (payload.name = selectedFile.filename)
        : fileErrors.push('name');
      selectedFile
        ? (payload.uri = selectedFile.sourceURL)
        : fileErrors.push('uri');
      selectedFile
        ? (payload.type = selectedFile.mime)
        : fileErrors.push('type');
    } else {
      selectedFile
        ? (payload.name = selectedFile.name)
        : fileErrors.push('name');
      selectedFile ? (payload.uri = selectedFile.uri) : fileErrors.push('uri');
      selectedFile
        ? (payload.type = selectedFile.type)
        : fileErrors.push('type');
    }
    if (fileErrors.length > 0) {
      return Alert.alert(`File Errors: ${JSON.stringify(fileErrors)}`);
    }

    // Validate the HTTP credentials
    //
    //
    //
    //
    //
    // Then...

    const uploadItemId = new Date().getTime();
    const uploadItem = {
      id: uploadItemId,
      payload,
      status: 100,
      error: null,
    };
    setCurrentUpload(uploadItem);

    try {
      const res = await uploadFile(payload);
      setUploadProgress(0);
      // if successful...
      // setCurrentUpload(null)
      return res;
    } catch (e) {
      console.log('Upload Media Caught', e);
      setUploadProgress(0);
      return e;
    }
  };

  const uploadFile = async payload => {
    const http = {client, url, route, reqType, field: fieldName};
    const headers = {token: headerToken};

    try {
      const res = await UploadsHTTP.uploadFile(
        http,
        headers,
        payload,
        setUploadProgress,
      );

      console.log('Main.js UploadsHTTP.uploadFile - Response: ', res);

      const code = res.responseCode;
      // console.log('Response Code: ', code);

      if (code === 200 || code === 201 || code === 202) {
        Toast.show(toastCreated('Upload'));
        return res;
      } else {
        const {data} = res.response;
        Toast.show(toastError(data));
        console.log('Upload Error: ', res);
        return res;
      }
    } catch (e) {
      const {data} = e.response;
      Toast.show(toastError(data));
      console.log('Upload Error Caught: ', data);
      return e;
    }
  };

  return (
    <SafeAreaView style={styles.main}>
      <StatusBar barStyle={'dark-content'} />

      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.content}>
        <FileUpload
          {...props}
          source={selectedFile}
          useImagePicker={useImagePicker}
          onPress={selectedFile ? resetFileSelection : openPicker}
        />

        <Form
          {...props}
          selectedFile={selectedFile}
          setSelectedFile={setSelectedFile}
          usePicker={useImagePicker}
          setUsePicker={confirmChangeModeIfFileSelected} // setUseImagePicker
          submitUpload={submitUpload}
          showHttpClientOptions={showHttpClientOptions}
          setShowHttpClientOptions={bool => {
            setShowHttpClientOptions(bool);
            if (showHttpReqTypeOptions) setShowHttpReqTypeOptions(false);
          }}
          showHttpReqTypeOptions={showHttpReqTypeOptions}
          setShowHttpReqTypeOptions={bool => {
            setShowHttpReqTypeOptions(bool);
            if (showHttpClientOptions) setShowHttpClientOptions(false);
          }}
        />
      </ScrollView>

      <Toast config={ToastConfig} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#000000',
  },
  content: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});

const mapStateToProps = state => ({
  // HTTP - Form Values
  client: state.http.client,
  url: state.http.url,
  route: state.http.route,
  reqType: state.http.reqType,
  fieldName: state.http.fieldName,
  headerToken: state.http.headerToken,
  // Uploads
  currentUpload: state.uploads.currentUpload,
  uploadProgress: state.uploads.uploadProgress,
});

function mapDispatchToProps(dispatch) {
  return {
    // HTTP - Form Updates
    resetHTTPReducer: () => dispatch(resetHTTPReducer()),
    setHttpClient: data => dispatch(setHttpClient(data)),
    setHttpUrl: data => dispatch(setHttpUrl(data)),
    setHttpRoute: data => dispatch(setHttpRoute(data)),
    setHttpReqType: data => dispatch(setHttpReqType(data)),
    setHttpFieldName: data => dispatch(setHttpFieldName(data)),
    setHttpHeaderToken: data => dispatch(setHttpHeaderToken(data)),
    // Uploads
    resetUploadReducer: () => dispatch(resetUploadReducer()),
    setCurrentUpload: data => dispatch(setCurrentUpload(data)),
    setUploadProgress: data => dispatch(setUploadProgress(data)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
