import React, { useReducer } from 'react';
import axios from 'axios';
import contactContext from './contactContext';
import contactReducer from './contactReducer';
import * as types from '../types';

const ContactState = props => {
  const initialState = {
    contacts: null,
    current: null,
    filtered: null,
    error: null
  };

  const [state, dispatch] = useReducer(contactReducer, initialState);

  //Get Contacts
  const getContacts = async () => {
    try {
      const res = await axios.get('/api/contacts');

      dispatch({
        type: types.GET_CONTACTS,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: types.CONTACT_ERROR,
        payload: err.response.msg
      });
    }
  };

  //Add Contact
  const addContact = async contact => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post('/api/contacts', contact, config);

      dispatch({
        type: types.ADD_CONTACT,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: types.CONTACT_ERROR,
        payload: err.response.msg
      });
    }
  };

  //Update Contact
  const updateContact = async contact => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.put(
        `/api/contacts/${contact._id}`,
        contact,
        config
      );
      dispatch({
        type: types.UPDATE_CONTACT,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: types.CONTACT_ERROR,
        payload: err.response.msg
      });
    }
  };

  //Delete Contact
  const deleteContact = async id => {
    try {
      await axios.delete(`/api/contacts/${id}`);
      dispatch({
        type: types.DELETE_CONTACT,
        payload: id
      });
    } catch (err) {
      dispatch({
        type: types.CONTACT_ERROR,
        payload: err.response.msg
      });
    }
  };

  //Clear Contacts
  const clearContacts = () => {
    dispatch({
      type: types.CLEAR_CONTACTS
    });
  };

  //Set Current Contact
  const setCurrent = contact => {
    dispatch({
      type: types.SET_CURRENT,
      payload: contact
    });
  };

  //Clear Current Contact
  const clearCurrent = () => {
    dispatch({
      type: types.CLEAR_CURRENT
    });
  };

  //Filter Contacts
  const filterContacts = text => {
    dispatch({
      type: types.FILTER_CONTACTS,
      payload: text
    });
  };

  //Clear Filters
  const clearFilter = () => {
    dispatch({
      type: types.CLEAR_FILTER
    });
  };

  return (
    <contactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        getContacts,
        addContact,
        updateContact,
        deleteContact,
        clearContacts,
        setCurrent,
        clearCurrent,
        filterContacts,
        clearFilter
      }}
    >
      {props.children}
    </contactContext.Provider>
  );
};

export default ContactState;
