import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
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
import Orientation from 'react-native-orientation-locker';
// import ImagePicker from 'react-native-image-crop-picker';
import DocumentPicker from 'react-native-document-picker';
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

  useEffect(() => {
    Orientation.lockToPortrait();
    return () => null;
  }, []);

  const [selectedFile, setSelectedFile] = useState(null);
  const openPicker = async () => {
    try {
      const res = await DocumentPicker.pickSingle();
      const {name, size, type, uri} = res;
      setSelectedFile(res);
      console.log('Selected', res);
    } catch (e) {
      console.log('Caught Error', e);
    }
  };

  return (
    <SafeAreaView style={styles.main}>
      <StatusBar barStyle={'dark-content'} />

      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.content}>
        <View style={styles.preview}>
          <TouchableOpacity onPress={openPicker} style={styles.open_btn}>
            <Text style={styles.txt}>Open Picker</Text>
          </TouchableOpacity>
        </View>
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
  preview: {
    flex: 1,
    height: Dimensions.get('screen').width,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
  open_btn: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    width: 160,
    backgroundColor: '#00DD00',
  },
  txt: {
    color: '#FFF',
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
