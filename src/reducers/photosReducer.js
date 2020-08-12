import {SEARCH_PHOTOS} from '../constants/types';
const initialState = {
  photos: [],
};
const photosReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_PHOTOS.FETCH_REQUEST:
      return {
        ...state,
        pending: true,
      };
    case SEARCH_PHOTOS.FETCH_SUCCESS:
      return {
				...state,
				photos: action.payload,
				pending: false,
      };
    case SEARCH_PHOTOS.FETCH_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error
      };

    default:
      return state;
  }
};
export default photosReducer;

export const getPhotos = state => state.photos;
export const getPhotosPending = state => state.pending;
export const getPhotosError = state => state.error;