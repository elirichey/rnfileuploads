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
  resetUploadsReducer,
  updateUploadQueue,
  clearUploadQueue,
  updateUploadQueueProgress,
} from './redux/actions/uploads';
import Orientation from 'react-native-orientation-locker';
import DocumentPicker from 'react-native-document-picker';
import ImagePicker from 'react-native-image-crop-picker';
import UploadsHTTP from './utilities/http/uploads';
// Components
import FileUpload from './components/Forms/FileUpload';
import Form from './components/Form';

function App(props) {
  // Redux
  const {client, url, route, reqType, fieldName, uploadQueue, uploadProgress} =
    props;
  // Actions
  const {
    // resetHTTPReducer, setHttpClient, setHttpUrl, setHttpRoute, setHttpReqType, setHttpFieldName, setHttpHeaderToken
    resetUploadsReducer,
    updateUploadQueue,
    clearUploadQueue,
    updateUploadQueueProgress,
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

  const [showHttpClientOptions, setShowHttpClientOptions] = useState(false);
  const [showHttpReqTypeOptions, setShowHttpReqTypeOptions] = useState(false);

  const submitUpload = async () => {
    let errors = [];
    let payload = {};
    selectedFile ? (payload.name = selectedFile.name) : errors.push('name');
    selectedFile ? (payload.uri = selectedFile.uri) : errors.push('uri');
    selectedFile ? (payload.type = selectedFile.type) : errors.push('type');
    if (errors.length > 0) {
      return Alert.alert(`Errors: ${JSON.stringify(errors)}`);
    }

    const queueItemId = new Date().getTime();
    const queueItem = {
      id: queueItemId,
      payload,
      status: 100,
      error: null,
    };
    const updatedQueueArray = [...uploadQueue];
    updatedQueueArray.push(queueItem);
    updateUploadQueue(updatedQueueArray);

    try {
      const res = await uploadMedia(payload, queueItem);
      return res;
    } catch (e) {
      console.log('Upload Media Caught', e);
      return e;
    }
  };

  const uploadMedia = async (eventId, payload, queueItem, accessToken) => {
    /*
    try {
      const res = await UploadsHTTP.uploadMedia(
        eventId,
        payload,
        accessToken,
        setFileUploaded,
      );

      // console.log('RESPONSE_CODE', res);
      if (res.responseCode === 202) {
        const newArray = [...uploadQueue];
        newArray.filter(x => x.id !== queueItem.id);
        updateUploadQueue(newArray);
        removeFileUploaded(payload);
        deleteCacheFile(payload.uri);
        return res;
      } else if (res.responseCode === 403) {
        try {
          const refresh = await refreshAccessToken();
          if (refresh) {
            return uploadMedia(eventId, payload, accessToken, queueItem);
          } else logout();
        } catch (e) {
          console.log('Upload - Refresh Caught', e.response);
          return e.response;
        }
      } else {
        // Need to test
        const newArray = [...uploadQueue];
        newArray.filter(x => x.id !== queueItem.id);
        updateUploadQueue(newArray);
        queueItem.status = res.error;
        queueItem.error = 400;
        newArray.push(queueItem);
        updateUploadQueue(newArray);
        console.log('NON-200 or 403 ERROR', res);
        removeFileUploaded(payload);
        return res;
      }
    } catch (e) {
      // Need to test
      const newArray = [...uploadQueue];
      newArray.filter(x => x.id !== queueItem.id);
      updateUploadQueue(newArray);
      queueItem.status = e;
      queueItem.error = e;
      newArray.push(queueItem);
      updateUploadQueue(newArray);
      console.log('CAUGHT_UPLOAD_ERROR', e);
      removeFileUploaded(payload);
      return e;
    }
    */
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
          usePicker={useImagePicker}
          onPress={openPicker}
        />

        <Form
          {...props}
          selectedFile={selectedFile}
          setSelectedFile={setSelectedFile}
          usePicker={useImagePicker}
          setUsePicker={setUseImagePicker}
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
  uploadQueue: state.uploads.uploadQueue,
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
    resetUploadsReducer: () => dispatch(resetUploadsReducer()),
    updateUploadQueue: data => dispatch(updateUploadQueue(data)),
    clearUploadQueue: data => dispatch(clearUploadQueue(data)),
    updateUploadQueueProgress: data =>
      dispatch(updateUploadQueueProgress(data)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
