import {
  RESET_UPLOADS_REDUCER,
  UPDATE_UPLOAD_QUEUE,
  CLEAR_UPLOAD_QUEUE,
  UPDATE_UPLOAD_QUEUE_PROGRESS,
} from '../actions/uploads';

const initialState = {
  uploadQueue: [],
  uploadProgress: [],
};

export default function uploads(state = initialState, action) {
  switch (action.type) {
    // General
    case RESET_UPLOADS_REDUCER:
      return initialState;

    // Uploads
    case UPDATE_UPLOAD_QUEUE:
      return {
        ...state,
        uploadQueue: action.data,
      };
    case CLEAR_UPLOAD_QUEUE:
      return {
        ...state,
        uploadQueue: [],
        uploadProgress: [],
      };
    case UPDATE_UPLOAD_QUEUE_PROGRESS:
      return {
        ...state,
        uploadProgress: action.data,
      };

    default:
      return state;
  }
}
