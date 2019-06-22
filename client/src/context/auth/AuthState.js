import React, { useReducer } from 'react';
import axios from 'axios';
import AuthContext from './authContext';
import AuthReducer from './authReducer';
import * as types from '../types';
import setAuthToken from '../../utils/setAuthToken';

const AuthState = props => {
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null,
    error: null
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  //Load User
  const loadUser = async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    try {
      const res = await axios.get('/api/auth');

      dispatch({
        type: types.USER_LOADED,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: types.AUTH_ERROR
      });
    }
  };

  //Register User
  const register = async formData => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    try {
      const res = await axios.post('/api/users', formData, config);
      dispatch({
        type: types.REGISTER_SUCCESS,
        payload: res.data
      });
      loadUser();
    } catch (err) {
      dispatch({
        type: types.REGISTER_FAIL,
        payload: err.response.data.msg
      });
    }
  };

  //Login User
  const login = async formData => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    try {
      const res = await axios.post('/api/auth', formData, config);
      dispatch({
        type: types.LOGIN_SUCCESS,
        payload: res.data
      });
      loadUser();
    } catch (err) {
      dispatch({
        type: types.LOGIN_FAIL,
        payload: err.response.data.msg
      });
    }
  };

  //Logout User
  const logout = () =>
    dispatch({
      type: types.LOGOUT
    });

  //Clear Errors
  const clearErrors = () => dispatch({ type: types.CLEAR_ERRORS });

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        loadUser,
        register,
        login,
        logout,
        clearErrors
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
