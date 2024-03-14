import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateFilter } from '../../redux/contactsSlice';
import './Filter.css';

const Filter = () => {
  const filter = useSelector((state) => state.contacts.filter);
  const dispatch = useDispatch();

  return (
    <input
      className="filter"
      type="text"
      name="filter"
      value={filter}
      onChange={(e) => dispatch(updateFilter(e.target.value))}
      placeholder="Filter contacts by name"
    />
  );
};

export default Filter;
