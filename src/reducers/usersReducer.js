import {SET_USERS, APPEND_USERS} from '../constants/types';

const initialState = {
  users: [],
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USERS:
      return {
        ...state,
        users: action.users,
      };
    case APPEND_USERS:
      return {
        ...state,
        users: [...state.users, ...action.users],
      };
    default:
      return state;
  }
};

export default usersReducer;
