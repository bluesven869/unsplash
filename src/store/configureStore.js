import {createStore, combineReducers} from 'redux';
import usersReducer from '../reducers/usersReducer';
import notificationReducer from '../reducers/notificationReducer';
import photosReducer from '../reducers/photosReducer';

const rootReducer = combineReducers({
  users: usersReducer,
  photos: photosReducer,
  notification: notificationReducer,
});

const configureStore = createStore(rootReducer);

export default configureStore;
