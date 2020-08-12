import {
  fetchPhotosRequest,
  fetchPhotosSuccess,
  fetchPhotosError,
} from '../actions/photos';

import Unsplash from 'unsplash-js';

export default function fetchPhotos(userName, page = 1, perPage = 20, orderBy = 'latest', stats = false) {
	return dispatch => {
		dispatch(fetchPhotosRequest());
		const unsplash = new Unsplash({ accessKey: "aa2f3c3be8125f1fc86e3007153420c4e446c19b7b0c6d80a6257b281c9a0dc5" });
		unsplash.users.photos(userName, page, perPage, orderBy, stats)
		.then(res => res.json())
		.then(res => {
			if(res.error) {
				throw(res.error);
			}
			dispatch(fetchPhotosSuccess(res.photos));
			return res.photos;
		})
		.catch(error => {
				dispatch(fetchPhotosError(error));
		})
}
}