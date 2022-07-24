import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
} from 'react-native';
import {connect} from 'react-redux';
import {
  resetHTTPReducer,
  setHttpClient,
  setHttpUrl,
  setHttpRoute,
  setHttpReqType,
  setHttpFieldName,
} from './redux/actions/http';
import {
  resetUploadsReducer,
  updateUploadQueue,
  clearUploadQueue,
  updateUploadQueueProgress,
} from './redux/actions/uploads';
import UploadsHTTP from './utilities/http/uploads';

function App(props) {
  // Redux
  const {client, url, route, reqType, fieldName, uploadQueue, uploadProgress} =
    props;
  // Actions
  const {
    resetHTTPReducer,
    setHttpClient,
    setHttpUrl,
    setHttpRoute,
    setHttpReqType,
    setHttpFieldName,
    resetUploadsReducer,
    updateUploadQueue,
    clearUploadQueue,
    updateUploadQueueProgress,
  } = props;

  const [selectedFile, setSelectedFile] = useState(null);

  return (
    <SafeAreaView style={styles.main}>
      <StatusBar barStyle={'dark-content'} />

      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.content}>
        <Text>Uploader</Text>
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
    alignItems: 'center',
    justifyContent: 'center',
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
    // Uploads
    resetUploadsReducer: () => dispatch(resetUploadsReducer()),
    updateUploadQueue: data => dispatch(updateUploadQueue(data)),
    clearUploadQueue: data => dispatch(clearUploadQueue(data)),
    updateUploadQueueProgress: data =>
      dispatch(updateUploadQueueProgress(data)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
