import {createStore, combineReducers} from 'redux';
import usersReducer from '../reducers/usersReducer';
import photosReducer from '../reducers/photosReducer';
const rootReducer = combineReducers({
  users: usersReducer,
  photos: photosReducer,
});
const configureStore = () => {
  return createStore(rootReducer);
};
export default configureStore;
