import Main from './Main';
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
  setUploadId,
  setUploadProgress,
} from './redux/actions/uploads';

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
  uploadId: state.uploads.uploadId,
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
    setUploadId: data => dispatch(setUploadId(data)),
    setUploadProgress: data => dispatch(setUploadProgress(data)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
