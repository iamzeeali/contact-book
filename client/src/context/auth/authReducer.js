import * as types from '../types';

export default (state, action) => {
  switch (action.type) {
    case types.USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload
      };
    case types.REGISTER_SUCCESS:
    case types.LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false
      };
    case types.REGISTER_FAIL:
    case types.AUTH_ERROR:
    case types.LOGIN_FAIL:
    case types.LOGOUT:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        error: action.payload
      };
    case types.CLEAR_ERRORS:
      return {
        ...state,
        error: null
      };
    default:
      return state;
  }
};
