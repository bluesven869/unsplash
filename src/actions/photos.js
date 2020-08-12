import {SET_PHOTOS, APPEND_PHOTOS} from '../constants/types';

export function setPhotos(photos) {
	return {
		type: SET_PHOTOS,
		photos
  };
}

export function appendPhotos(photos) {
	return {
		type: APPEND_PHOTOS,
		photos
	}
}
