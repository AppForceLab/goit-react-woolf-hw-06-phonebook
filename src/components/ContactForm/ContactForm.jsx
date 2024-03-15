import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getContacts } from '../../redux/selectors';

import { addContact } from '../../redux/contactsSlice';
import './ContactForm.css';

const ContactForm = () => {
  const contacts = useSelector(getContacts);
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const dispatch = useDispatch();

  const validateName = name => {
    const nameRegex = /^[a-zA-Zа-яА-Я]+([' -]?[a-zA-Zа-яА-Я ]+)*$/;
    return nameRegex.test(name);
  };

  const validateNumber = number => {
    const numberRegex =
      /^\+?\d{1,4}?([-.\s]?\(?\d{1,3}\)?[-.\s]?\d{1,4}){1,2}([-.\s]?\d{1,9})?$/;
    return numberRegex.test(number);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!validateName(name)) {
      alert(
        'Please enter a valid name. Name may contain only letters, apostrophe, dash and spaces.'
      );
      return;
    }
    if (!validateNumber(number)) {
      alert(
        'Please enter a valid phone number. Phone number must be digits and can contain spaces, dashes, parentheses and can start with +'
      );
      return;
    }
    const duplicate = contacts.find(contact => contact.name === name);
    if (duplicate) {
      alert(`${name} is already in contacts.`);
      return;
    }
    dispatch(addContact(name, number));
    setName('');
    setNumber('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        required
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Enter name"
      />
      <input
        type="tel"
        name="number"
        required
        value={number}
        onChange={e => setNumber(e.target.value)}
        placeholder="Enter phone number"
      />
      <button type="submit">Add contact</button>
    </form>
  );
};

export default ContactForm;
