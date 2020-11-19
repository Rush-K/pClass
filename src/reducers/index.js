import { combineReducers } from 'redux';
import LoginReducer from './LoginReducer';
import SubjectReducer from './SubjectReducer';
import ProjectReducer from './ProjectReducer';
 
const reducers = combineReducers({
  LoginReducer, SubjectReducer, ProjectReducer
});
 
export default reducers;