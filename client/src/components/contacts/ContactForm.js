import React, { useState, useContext, useEffect } from 'react';
import ContactContext from '../../context/contact/contactContext';

const ContactForm = () => {
  const contactContext = useContext(ContactContext);

  const { addContact, updateContact, current, clearCurrent } = contactContext;

  const [contact, setContact] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'personal'
  });

  useEffect(() => {
    if (current !== null) {
      setContact(current);
    } else {
      setContact({
        name: '',
        email: '',
        phone: '',
        type: 'personal'
      });
    }
  }, [contactContext, current]);

  const { name, email, phone, type } = contact;

  const onChangeHandler = e =>
    setContact({ ...contact, [e.target.name]: e.target.value });

  const onSubmitHandler = e => {
    e.preventDefault();

    if (current === null) {
      addContact(contact);
    } else {
      updateContact(contact);
    }

    setContact({
      name: '',
      email: '',
      phone: '',
      type: 'personal'
    });
  };

  const clearAll = () => {
    clearCurrent();
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <h2 className="text-primary">
        {current ? 'Edit Contact' : 'Add Contact'}
      </h2>
      <input
        type="text"
        placeholder="Enter Name"
        name="name"
        value={name}
        onChange={onChangeHandler}
      />
      <input
        type="email"
        placeholder="Enter Email"
        name="email"
        value={email}
        onChange={onChangeHandler}
      />
      <input
        type="text"
        placeholder="Enter Phone"
        name="phone"
        value={phone}
        onChange={onChangeHandler}
      />
      <h5>Contact Type</h5>
      <input
        type="radio"
        name="type"
        value="personal"
        onChange={onChangeHandler}
        checked={type === 'personal'}
      />{' '}
      Personal{' '}
      <input
        type="radio"
        name="type"
        value="professional"
        onChange={onChangeHandler}
        checked={type === 'professional'}
      />{' '}
      Professional
      <div>
        <input
          type="submit"
          value={current ? 'Update Contact' : 'Add Contact'}
          className="btn btn-primary btn-block"
        />
      </div>
      {current && (
        <div>
          <button className="btn btn-light btn-block" onClick={clearAll}>
            Clear
          </button>
        </div>
      )}
    </form>
  );
};

export default ContactForm;
