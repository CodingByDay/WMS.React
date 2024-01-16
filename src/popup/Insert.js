import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import TransactionService from '../services/TransactionService';
import ListingService from '../services/ListingService';
import { useSelector, useDispatch } from 'react-redux'
import DataAccess from "../utility/DataAccess";

const Insert = (props) => {
  const [dropdownOptions, setDropdownOptions] = useState({});
  const [selectedOptions, setSelectedOptions] = useState({});


  function extractDropdownPairs(data) {
    const dropdownPairs = {};
    data.value.forEach((column) => {
      if (column.type === 'dropdown') {
        dropdownPairs[column.accessor] = column.sourceSelect || '';
      }

    });
  
    return dropdownPairs;
  }


    const connectData = async () => {
      if(props.isVisible) {
      try {


        var pairs = extractDropdownPairs(props.selectedTable)
        console.log(pairs)
        /*
        // Make an API call to get dropdown options
        const options = await TransactionService.getDropdownOptions(); // Replace with your actual API call
        // Create an object with dropdown options for each column
        const optionsObject = props.selectedTable.value.reduce((acc, column) => {
          if (column.popupType === 'dropdown') {
            acc[column.accessor] = options;
          }
          return acc;
        }, {});
        setDropdownOptions(optionsObject);
        */


      } catch (error) {
        // Handle errors
        console.error('Error fetching dropdown options:', error);
      }

    }
    };



  

  if (!props.isVisible) {
     return null;
  } else {
    connectData()
  }

   function onClose() {
    props.onClose();
  }
  const handleSelectChange = (accessor, selected) => {
    setSelectedOptions({
      ...selectedOptions,
      [accessor]: selected,
    });
  };





  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <div className="popup-header">
          <button className="popup-close-btn" onClick={onClose} >
            X
          </button>
        </div>
        <div className="popup-body">
        {props.selectedTable.value.map((column) => (
           column.type !== 'nothing' && (
            <div key={column.accessor} className="form-group">
              <label htmlFor={column.accessor}>{column.Header}:</label>
              {column.type === 'dropdown' ? (
               <Select
               id={column.accessor}
               name={column.accessor}
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
                  // Add other necessary attributes and event handlers
                />
              )}
            </div>
           )
          ))}


          <div className="center-button">
            <center><span  className="actions smallerr">
              Dodaj
            </span>
            </center>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Insert;