import {combineReducers} from 'redux';
import http from './http';
import uploads from './uploads';

const rootReducer = combineReducers({
  http,
  uploads,
});

export default rootReducer;
