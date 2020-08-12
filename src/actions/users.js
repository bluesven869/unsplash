import {SET_USERS, APPEND_USERS} from '../constants/types';

export function setUsers(users) {
	return {
		type: SET_USERS,
		users
  };
}

export function appendUsers(users) {
	return {
		type: APPEND_USERS,
		users
	}
}
