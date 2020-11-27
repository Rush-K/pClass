import { combineReducers } from 'redux';
import ProjectReducer from './ProjectReducer';
import SubjectReducer from './SubjectReducer';
import FeedReducer from './FeedReducer';
 
const reducers = combineReducers({
  ProjectReducer, SubjectReducer, FeedReducer
});
 
export default reducers;