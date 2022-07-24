// General
export const RESET_HTTP_REDUCER = 'RESET_HTTP_REDUCER';

// Controls
export const SET_HTTP_CLIENT = 'SET_HTTP_CLIENT';
export const SET_HTTP_URL = 'SET_HTTP_URL';
export const SET_HTTP_ROUTE = 'SET_HTTP_ROUTE';
export const SET_HTTP_REQ_TYPE = 'SET_HTTP_REQ_TYPE';
export const SET_HTTP_FIELD_NAME = 'SET_HTTP_FIELD_NAME';

// General

export function resetHTTPReducer() {
  return {
    type: RESET_HTTP_REDUCER,
  };
}

// Controls

export function setHttpClient(data) {
  return {
    type: SET_HTTP_CLIENT,
    data: data,
  };
}

export function setHttpUrl(data) {
  return {
    type: SET_HTTP_URL,
    data: data,
  };
}

export function setHttpRoute(data) {
  return {
    type: SET_HTTP_ROUTE,
    data: data,
  };
}

export function setHttpReqType(data) {
  return {
    type: SET_HTTP_REQ_TYPE,
    data: data,
  };
}

export function setHttpFieldName(data) {
  return {
    type: SET_HTTP_FIELD_NAME,
    data: data,
  };
}
