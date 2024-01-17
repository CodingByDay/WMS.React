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
    <div className="popup-overlay insert">
      <div className="popup-content insert">
        <div className="popup-header insert">
          <button className="popup-close-btn insert" onClick={onClose} >
            X
          </button>
        </div>
        <div className="popup-body insert">
        {props.selectedTable.value.map((column) => (
           column.type !== 'nothing' && (
            <div key={column.accessor} className="form-group insert">
              <label htmlFor={column.accessor}>{column.Header}:</label>
              {column.type === 'dropdown' ? (




               <Select
               id={column.accessor}
               placeholder={column.dropdownPlaceholder}
               name={column.accessor}
               getOptionLabel={(option) => option.label}
               getOptionValue={(option) => option.value}
               formatOptionLabel={formatOptionLabel}
               options={dropdownOptions[column.accessor] || []}
               value={selectedOptions[column.accessor]}
               onChange={(selected) => handleSelectChange(column.accessor, selected)}
               
             />
            

             
              ) : (
                <input
                type={column.type === 'checkbox' ? 'checkbox' : 'text'}
                id={column.accessor}
                name={column.accessor}
                className={column.type === 'checkbox' ? 'form-check-input' : 'form-control'}
                value={getValue(column.accessor)} // Set the value from state
                onChange={handleInputChange} // Update the state on change
              />
              )}
            </div>
           )
          ))}


          <div className="center-button">
            <center><span onClick={sendData}  className="actions smallerr">
              Dodaj
            </span>
            </center>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;