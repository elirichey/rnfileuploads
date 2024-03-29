import axios from 'axios';
import Upload from 'react-native-background-upload';
import RNFS from 'react-native-fs';

const uploadFile = async (
  http,
  headers,
  payload,
  setUploadId,
  setPercentUploaded,
) => {
  switch (http.client) {
    case 'Axios':
      return await axiosUpload(
        http,
        headers,
        payload,
        setUploadId,
        setPercentUploaded,
      );
    case 'Background Uploader':
      return await backgroundUpload(
        http,
        headers,
        payload,
        setUploadId,
        setPercentUploaded,
      );
    case 'RNFS':
      return await rnfsUpload(
        http,
        headers,
        payload,
        setUploadId,
        setPercentUploaded,
      );
    default:
      return await backgroundUpload(
        http,
        headers,
        payload,
        setUploadId,
        setPercentUploaded,
      );
  }
};

// React Native Background Uploader
const backgroundUpload = async (
  http,
  headers,
  payload,
  setUploadId,
  setPercentUploaded,
) => {
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

  return await new Promise(resolve => {
    Upload.startUpload(options)
      .then(uploadId => {
        console.log('Background Upload: Starting', uploadId);
        setUploadId(uploadId);

        Upload.addListener('progress', uploadId, res => {
          console.log(`Background Upload: Progress - ${res.progress}%`);
          setPercentUploaded(res.progress);
        });
        Upload.addListener('error', uploadId, res => {
          console.log(`Background Upload: Error - ${res.error}`);
          controller.abort();
          return resolve(res.error);
        });
        Upload.addListener('cancelled', uploadId, res => {
          console.log(`Background Upload: Cancelled - ${uploadId}`, res);
          return resolve(res);
        });
        Upload.addListener('completed', uploadId, res => {
          console.log(`Background Upload: Completed - ${uploadId}`, res);
          return resolve(res);
        });
      })
      .catch(err => {
        console.log('Background Upload: Caught Error -', err);
        controller.abort();
        return resolve(err);
      });
  });
};

const rnfsUpload = (
  http,
  headers,
  payload,
  setUploadId,
  setPercentUploaded,
) => {
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
    setPercentUploaded(percentUploaded);
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

const axiosUpload = async (
  http,
  headers,
  payload,
  setUploadId,
  setPercentUploaded,
) => {
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

  return await axios({
    url: routePath,
    method: reqType,
    headers: headerObj,
    data: formData,
    onUploadProgress: ({total, loaded}) => {
      const progress = (loaded / total) * 100;
      const percentage = Math.round(progress);
      console.log(`Axios Upload: Progress - ${percentage}%`);
      setPercentUploaded(percentage);
    },
  })
    .then(res => {
      if (res.status) {
        const {status, data} = res;
        console.log('Axios Upload: Success - Status', status);
        console.log('Axios Upload: Success - Data', data);
        return {status, data};
      } else {
        console.log('Axios Upload: Error -', res);
        return res.status;
      }
    })
    .catch(error => {
      const {status} = error.response;
      console.log('Axios Upload: Catch Error -', error.response);
      if (status === 0) {
        return `Connection Error - Are you sure the route is correct?`;
      } else return status;
    });
};

const cancelUpload = async (id, client) => {
  return new Promise(resolve => {
    if (client === 'Background Uploader') {
      console.log('Canceled!', id);
      return resolve(Upload.cancelUpload(id));
    } else {
      return resolve({id, client});
    }
  });
};

const UploadsHTTP = {
  uploadFile,
  cancelUpload,
};

export default UploadsHTTP;
