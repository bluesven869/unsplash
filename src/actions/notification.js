import {SET_NOTIFICATIONS} from '../constants/types';

export function setNotification(message) {
	return {
		type: SET_NOTIFICATIONS,
		message
  };
}