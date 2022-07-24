import {
  RESET_HTTP_REDUCER,
  SET_HTTP_CLIENT,
  SET_HTTP_URL,
  SET_HTTP_ROUTE,
  SET_HTTP_REQ_TYPE,
  SET_HTTP_FIELD_NAME,
  SET_HTTP_HEADER_TOKEN,
} from '../actions/http';

const initialState = {
  client: 'Background Uploader', // 'Axios' || 'Background Uploader' || 'RNFS'
  url: '',
  route: '',
  reqType: '', // 'PUT' || 'POST'
  fieldName: '',
  headerToken: '',
};

export default function http(state = initialState, action) {
  switch (action.type) {
    // General

    case RESET_HTTP_REDUCER:
      return initialState;

    // Controls

    case SET_HTTP_CLIENT:
      return {
        ...state,
        client: action.data,
      };
    case SET_HTTP_URL:
      return {
        ...state,
        url: action.data,
      };

    case SET_HTTP_ROUTE:
      return {
        ...state,
        route: action.data,
      };

    case SET_HTTP_REQ_TYPE:
      return {
        ...state,
        reqType: action.data,
      };

    case SET_HTTP_FIELD_NAME:
      return {
        ...state,
        fieldName: action.data,
      };

    case SET_HTTP_HEADER_TOKEN:
      return {
        ...state,
        headerToken: action.data,
      };

    default:
      return state;
  }
}
