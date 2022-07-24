import axios from 'axios';
import Upload from 'react-native-background-upload';
import RNFS from 'react-native-fs';

const uploadFile = async (http, headers, payload, setPercentUploaded) => {
  const {client} = http;
  switch (client) {
    case 'Axios':
      return '';
    case 'Background':
      return () => backgroundUpload(http, headers, payload, setPercentUploaded);
    case 'RNFS':
      return () => rnfsUpload(http, headers, payload, setPercentUploaded);
    default:
      return () => backgroundUpload(http, headers, payload, setPercentUploaded);
  }
};

// React Native Background Uploader
const backgroundUpload = (http, headers, payload, setPercentUploaded) => {
  const controller = new AbortController();

  // Prop Values
  const {url, reqType, route, field} = http;
  const {token} = headers;
  const {name, uri, type} = payload;

  const routePath = url + route;
  const headerObj = token
    ? {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'content-type': 'multipart/form-data',
      }
    : {
        Accept: 'application/json',
        'content-type': 'multipart/form-data',
      };

  const options = {
    url: routePath,
    path: uri,
    method: reqType,
    field: 'file', // this must match FileInterceptor api value in uploader.controller.ts
    type: 'multipart',
    headers: headerObj,
    notification: {
      enabled: true,
      autoClear: true,
    },
  };

  Upload.startUpload(options)
    .then(uploadId => {
      console.log('Background Upload: Starting');
      Upload.addListener('progress', uploadId, res => {
        console.log(`Background Upload: Progress - ${res.progress}%`);
        setPercentUploaded({payload, progress: res.progress});
      });
      Upload.addListener('error', uploadId, res => {
        console.log(`Background Upload: Error - ${res.error}`);
        controller.abort();
        return res;
      });
      Upload.addListener('cancelled', uploadId, res => {
        console.log('Background Upload: Cancelled -', res);
        return res;
      });
      Upload.addListener('completed', uploadId, res => {
        console.log(`Background Upload: Completed - ${res.id}`);
        return res;
      });
    })
    .catch(err => {
      console.log('Background Upload: Caught Error -', err);
      controller.abort();
      return err;
    });
};

const rnfsUpload = (http, headers, payload, setPercentUploaded) => {
  const controller = new AbortController();

  // Prop Values
  const {url, reqType, route, field} = http;
  const {token} = headers;
  const {name, uri, type} = payload;

  const routePath = url + route;
  const headerObj = token
    ? {
        Authorization: `Bearer ${token}`,
      }
    : null;

  const files = [
    {
      name: 'files',
      filename: name,
      filepath: uri,
      filetype: type,
    },
  ];

  const uploadStarted = res => console.log(`Upload Starting: ${res.jobId}`);
  const uploadProgress = res => {
    const {totalBytesSent, totalBytesExpectedToSend} = res;
    const percentUploaded = Math.floor(
      (totalBytesSent / totalBytesExpectedToSend) * 100,
    );
    console.log(`RNFS Upload: Progress - ${percentUploaded}%`);
    setPercentUploaded({payload, progress: percentUploaded});
  };

  RNFS.uploadFiles({
    toUrl: routePath,
    files: files,
    method: reqType,
    headers: headerObj,
    begin: uploadStarted,
    progress: uploadProgress,
  })
    .promise.then(res => {
      const {statusCode, header, body} = res;
      if (statusCode === 200 || statusCode === 201) {
        console.log('RNFS Upload: Success -', body.uploadResponse);
        return res;
      } else {
        console.log('RNFS Upload: Error -', body.uploadResponse);
        controller.abort();
        return res;
      }
    })
    .catch(err => {
      console.log('RNFS Upload: Caught Error -', err);
      controller.abort();
      return err;
    });
};

// const axiosUpload = await () => {}

const UploadsHTTP = {
  uploadFile,
};

export default UploadsHTTP;
