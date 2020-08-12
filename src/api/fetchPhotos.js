import {
  fetchPhotosRequest,
  fetchPhotosSuccess,
  fetchPhotosError,
} from '../actions/photos';

export default function fetchPhotos() {
	return dispatch => {
		dispatch(fetchPhotosRequest());
		
		fetch('https://exampleapi.com/products')
		.then(res => res.json())
		.then(res => {
			if(res.error) {
				throw(res.error);
			}
			dispatch(fetchPhotosSuccess(res.users);
			return res.users;
		})
		.catch(error => {
				dispatch(fetchPhotosError(error));
		})
}
}