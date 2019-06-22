import * as types from '../types';

export default (state, action) => {
  switch (action.type) {
    case types.SET_ALERT:
      return [...state, action.payload];
    case types.REMOVE_ALERT:
      return state.filter(alert => alert.id !== action.payload);
    default:
      return state;
  }
};
