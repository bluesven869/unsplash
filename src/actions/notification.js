import {SET_NOTIFICATIONS} from '../constants/types';

export function setNotifications(message) {
	return {
		type: SET_NOTIFICATIONS,
		message
  };
}