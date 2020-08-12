import {
  fetchUsersRequest,
  fetchUsersSuccess,
  fetchUsersError,
} from '../actions/users';

export default function fetchUsers() {
	return dispatch => {
		dispatch(fetchUsersRequest());
		fetch('https://exampleapi.com/products')
		.then(res => res.json())
		.then(res => {
			if(res.error) {
					throw(res.error);
			}
			dispatch(fetchUsersSuccess(res.users);
			return res.users;
		})
		.catch(error => {
				dispatch(fetchUsersError(error));
		})
}
}