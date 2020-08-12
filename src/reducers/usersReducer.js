import {SEARCH_USERS} from '../constants/types';

const initialState = {
  users: [],
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_USERS.FETCH_REQUEST:
      return {
        ...state,
        pending: true,
      };
    case SEARCH_USERS.FETCH_SUCCESS:
      return {
				...state,
				users: action.payload,
				pending: false,
      };
    case SEARCH_USERS.FETCH_ERROR:
      return {
        ...state,
				pending: false,
				error: action.error
      };

    default:
      return state;
  }
};

export default usersReducer;
export const getUsers = state => state.users;
export const getUsersPending = state => state.pending;
export const getUsersError = state => state.error;