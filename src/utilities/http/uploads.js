import axios from 'axios';
import Upload from 'react-native-background-upload';
import RNFS from 'react-native-fs';

const uploadFile = async (http, headers, payload, setPercentUploaded) => {
  switch (http.client) {
    case 'Axios':
      return axiosUpload(http, headers, payload, setPercentUploaded);
    case 'Background':
      return backgroundUpload(http, headers, payload, setPercentUploaded);
    case 'RNFS':
      return rnfsUpload(http, headers, payload, setPercentUploaded);
    default:
      return backgroundUpload(http, headers, payload, setPercentUploaded);
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

const axiosUpload = (http, headers, payload, setPercentUploaded) => {
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

  const file = {
    uri: uri,
    name: name,
    type: type,
  };

  console.log('File Payload: ', file);

  const formData = new FormData();
  formData.append('file', file);

  // field: 'file', // this must match FileInterceptor api value in uploader.controller.ts

  axios({
    url: routePath,
    method: reqType,
    headers: headerObj,
    data: formData,
    onUploadProgress: ({total, loaded}) => {
      const progress = (loaded / total) * 100;
      const percentage = Math.round(progress);
      console.log(`Axios Upload: Progress - ${percentage}%`);
      setPercentUploaded({payload, progress: percentage});
    },
  })
    .then(res => {
      if (res.status === 201) {
        console.log('Axios Upload: Success -', res.data.data);
        return res.data;
      } else {
        console.log('Axios Upload: Error -', res);
      }
    })
    .catch(error => {
      console.log('Axios Upload: Catch Error -', error);
      return error;
    });
};

const UploadsHTTP = {
  uploadFile,
};

export default UploadsHTTP;
