import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import TransactionService from '../services/TransactionService';
import ListingService from '../services/ListingService';
import { useSelector, useDispatch } from 'react-redux'
import DataAccess from "../utility/DataAccess";
import SettingsService from '../services/SettingsService';
import Swal from 'sweetalert2';

const Search = (props) => {






  return (
    <div className="search">
        <input
                type=''
                id={column.accessor}
                name={column.accessor}
                className={column.type === 'checkbox' ? 'form-check-input' : 'form-control'}
                value={getValue(column.accessor)} // Set the value from state
                onChange={handleInputChange} // Update the state on change
              />
    </div>
  );
};

export default Search;