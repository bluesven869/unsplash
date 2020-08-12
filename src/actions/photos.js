import {SEARCH_PHOTOS} from '../constants/types';

export function fetchPhotosRequest() {
  return {
    type: SEARCH_PHOTOS.FETCH_REQUEST,
  };
}

export function fetchPhotosSuccess(photos) {
	return {
		type: SEARCH_PHOTOS.FETCH_SUCCESS,
		photos
  };
}

export function fetchPhotosError(error) {
	return {
		type: SEARCH_PHOTOS.FETCH_ERROR,
		error,
	}
}

