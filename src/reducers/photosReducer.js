import {SET_PHOTOS, APPEND_PHOTOS} from '../constants/types';
const initialState = {
  photos: [],
};
const photosReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PHOTOS:
      return {
        ...state,
        photos: action.photos,
      };
    case APPEND_PHOTOS:
      return {
        ...state,
        photos: [...state.photos, ...action.photos],
      };
    default:
      return state;
  }
};
export default photosReducer;
