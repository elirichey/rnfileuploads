import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Alert,
  Platform,
} from 'react-native';
import Orientation from 'react-native-orientation-locker';
import DocumentPicker from 'react-native-document-picker';
import ImagePicker from 'react-native-image-crop-picker';
import Toast from 'react-native-toast-message';
import ToastConfig, {
  toastUploadComplete,
  toastError,
} from './components/Toast/ToastConfig';
import UploadsHTTP from './utilities/http/uploads';
import validateUploadFields from './utilities/validations/validate-upload-fields';
// Components
import FileUpload from './components/Forms/FileUpload';
import Form from './components/Form';
import Loader from './components/Loader/Loader';

export default function Main(props) {
  // Redux
  const {
    client,
    url,
    route,
    reqType,
    headerToken,
    fieldName,
    uploadId,
    uploadProgress,
  } = props;
  // Actions
  const {resetUploadReducer, setCurrentUpload, setUploadProgress, setUploadId} =
    props;

  useEffect(() => {
    Orientation.lockToPortrait();
    return () => null;
  }, []);

  const [selectedFile, setSelectedFile] = useState(null);
  const [useImagePicker, setUseImagePicker] = useState(true);
  // const [isEditing, setIsEditing] = useState(false);

  const openPicker = async () => {
    if (useImagePicker) {
      return ImagePicker.openPicker({})
        .then(res => setSelectedFile(res))
        .catch(e => null);
    } else {
      try {
        const res = await DocumentPicker.pickSingle();
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

  const [loading, setLoading] = useState(false);
  const submitUpload = async () => {
    const isIos = Platform.OS === 'ios';

    let fileErrors = [];
    let payload = {};
    if (useImagePicker) {
      if (isIos) {
        // iOS Payload
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
        // Android Payload
        const fileName = selectedFile.path.replace(/^.*[\\\/]/, '');

        const filePath = selectedFile.path.split('file://')[1];

        selectedFile ? (payload.name = fileName) : fileErrors.push('name');
        selectedFile ? (payload.uri = filePath) : fileErrors.push('uri');
        selectedFile
          ? (payload.type = selectedFile.mime)
          : fileErrors.push('type');
      }
    } else {
      // Android Payload - iOS Not Tested yet
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
    const http = {
      client: client.trim(),
      url: url.trim(),
      route: route.trim(),
      reqType,
      field: fieldName,
    };
    const fieldErrors = await validateUploadFields(http);
    if (fieldErrors.length > 0) {
      return Alert.alert(`Field Errors: ${JSON.stringify(fieldErrors)}`);
    }
    console.log('FieldsValidated', fieldErrors);

    setLoading(true);
    const uploadItemId = new Date().getTime();
    const uploadItem = {
      id: uploadItemId,
      payload,
      status: 100,
      error: null,
    };
    setCurrentUpload(uploadItem);

    try {
      const res = await uploadFile(http, payload);
      // console.log('Upload Done', res);
      setTimeout(() => {
        setUploadProgress(0);
        setUploadId(null);
        setLoading(false);
      }, 1000);
      return res;
    } catch (e) {
      console.log('Upload Media Caught', e);
      setTimeout(() => {
        setUploadProgress(0);
        setUploadId(null);
        setLoading(false);
      }, 1000);
    }
  };

  const uploadFile = async (http, payload) => {
    const headers = {token: headerToken};

    const res = await UploadsHTTP.uploadFile(
      http,
      headers,
      payload,
      setUploadId,
      setUploadProgress,
    );

    console.log('Response', res);

    if (res) {
      if (client === 'Background Uploader') {
        const code = res.responseCode;
        if (code === 200 || code === 201 || code === 202) {
          Toast.show(toastUploadComplete('Background Uploader'));
          return res;
        } else {
          Toast.show(toastError(res));
          console.log('Background_Upload_Error: ', res);
          return res;
        }
      }
    }
    if (client === 'Axios') {
      const code = res.status;
      if (code === 200 || code === 201 || code === 202) {
        Toast.show(toastUploadComplete('Axios'));
        return res;
      } else {
        Toast.show(toastError(res));
        console.log('Axios_Upload_Error: ', res);
        return res;
      }
    }
    if (client === 'RNFS') {
      console.log('Client: RNFS', res);
      /* const code = res.status;
      if (code === 200 || code === 201 || code === 202) {
        Toast.show(toastUploadComplete('Axios'));
        return res;
      } else {
        const {data} = res.response;
        Toast.show(toastError(data));
        console.log('RNFS_Upload_Error: ', res);
        return res;
      } */
    }
    return res;
  };

  const confirmCancelUpload = async () => {
    const options = [
      {text: 'Exit', style: 'default', onPress: () => null},
      {
        text: 'Cancel Upload',
        style: 'destructive',
        onPress: cancelUpload,
      },
    ];

    Alert.alert(
      `Confirm Cancel`,
      `Are you sure you want to cancel the upload?`,
      options,
    );
  };

  const cancelUpload = async () => {
    await UploadsHTTP.cancelUpload(uploadId, client.trim());
    setUploadProgress(0);
    setUploadId(null);
    setLoading(false);
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
          loading={loading}
          submitDisabled={!selectedFile || loading}
        />
      </ScrollView>

      {loading ? (
        <Loader progress={uploadProgress} onPress={confirmCancelUpload} />
      ) : null}

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
