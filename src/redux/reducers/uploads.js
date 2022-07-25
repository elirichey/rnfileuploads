import {
  RESET_UPLOAD_REDUCER,
  SET_CURRENT_UPLOAD,
  SET_UPLOAD_ID,
  SET_UPLOAD_PROGRESS,
} from '../actions/uploads';

const initialState = {
  currentUpload: null,
  uploadId: null,
  uploadProgress: 0,
};

export default function uploads(state = initialState, action) {
  switch (action.type) {
    // General
    case RESET_UPLOAD_REDUCER:
      return initialState;

    // Uploads
    case SET_CURRENT_UPLOAD:
      return {
        ...state,
        currentUpload: action.data,
      };

    case SET_UPLOAD_ID:
      return {
        ...state,
        uploadId: action.data,
      };

    case SET_UPLOAD_PROGRESS:
      return {
        ...state,
        uploadProgress: action.data,
      };

    default:
      return state;
  }
}
