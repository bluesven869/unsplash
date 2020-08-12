import {SET_NOTIFICATION} from '../constants/types';

const initialState = {
  message: '',
};

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_NOTIFICATION:
      return {
        ...state,
        message: action.message
      };

    default:
      return state;
  }
};

export default notificationReducer;