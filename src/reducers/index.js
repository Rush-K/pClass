import { combineReducers } from 'redux';
import LoginReducer from './LoginReducer';
import ProjectReducer from './ProjectReducer';
import SubjectReducer from './SubjectReducer';
import FeedReducer from './FeedReducer';
 
const reducers = combineReducers({
  LoginReducer, ProjectReducer, SubjectReducer, FeedReducer
});
 
export default reducers;