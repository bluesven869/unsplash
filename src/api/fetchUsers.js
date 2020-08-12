import {
  fetchUsersRequest,
  fetchUsersSuccess,
  fetchUsersError,
} from '../actions/users';

import Unsplash from 'unsplash-js';

export default function fetchUsers(keyword, page, per_page) {
	return dispatch => {
		dispatch(fetchUsersRequest());
		const unsplash = new Unsplash({ accessKey: "aa2f3c3be8125f1fc86e3007153420c4e446c19b7b0c6d80a6257b281c9a0dc5" });
		unsplash.search.users(keyword, page, per_page)
		.then(res => res.json())
		.then(res => {
			if(res.error) {
					throw(res.error);
			}
			dispatch(fetchUsersSuccess(res.users));
			return res.users;
		})
		.catch(error => {
				dispatch(fetchUsersError(error));
		})
}
}