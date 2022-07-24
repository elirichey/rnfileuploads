// General
export const RESET_UPLOADS_REDUCER = 'RESET_UPLOADS_REDUCER';

// Uploads
export const UPDATE_UPLOAD_QUEUE = 'UPDATE_UPLOAD_QUEUE';
export const CLEAR_UPLOAD_QUEUE = 'CLEAR_UPLOAD_QUEUE';
export const UPDATE_UPLOAD_QUEUE_PROGRESS = 'UPDATE_UPLOAD_QUEUE_PROGRESS';

// General
export function resetUploadsReducer() {
  return {
    type: RESET_UPLOADS_REDUCER,
  };
}

// Uploads

export function updateUploadQueue(data) {
  return {
    type: UPDATE_UPLOAD_QUEUE,
    data: data,
  };
}
export function clearUploadQueue() {
  return {
    type: CLEAR_UPLOAD_QUEUE,
  };
}
export function updateUploadQueueProgress(data) {
  return {
    type: UPDATE_UPLOAD_QUEUE_PROGRESS,
    data: data,
  };
}
