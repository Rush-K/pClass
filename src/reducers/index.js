import { combineReducers } from 'redux';
import LoginReducer from './LoginReducer';
import ProjectReducer from './ProjectReducer';
 
const reducers = combineReducers({
  LoginReducer, ProjectReducer
});
 
export default reducers;