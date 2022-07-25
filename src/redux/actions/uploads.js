// General
export const RESET_UPLOAD_REDUCER = 'RESET_UPLOAD_REDUCER';

// Uploads
export const SET_CURRENT_UPLOAD = 'SET_CURRENT_UPLOAD';
export const SET_UPLOAD_PROGRESS = 'SET_UPLOAD_PROGRESS';

// General

export function resetUploadReducer() {
  return {
    type: RESET_UPLOAD_REDUCER,
  };
}

// Uploads

export function setCurrentUpload(data) {
  return {
    type: SET_CURRENT_UPLOAD,
    data: data,
  };
}

export function setUploadProgress(data) {
  return {
    type: SET_UPLOAD_PROGRESS,
    data: data,
  };
}
