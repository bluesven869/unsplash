import {SEARCH_USERS} from '../constants/types';

export function fetchUsersRequest() {
  return {
    type: SEARCH_USERS.FETCH_REQUEST,
  };
}

export function fetchUsersSuccess(users) {
	return {
		type: SEARCH_USERS.FETCH_SUCCESS,
		users
  };
}

export function fetchUsersError(error) {
	return {
		type: SEARCH_USERS.FETCH_ERROR,
		error,
	}
}

