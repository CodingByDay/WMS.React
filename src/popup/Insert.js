import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import TransactionService from '../services/TransactionService';
import ListingService from '../services/ListingService';
import { useSelector, useDispatch } from 'react-redux'
import DataAccess from "../utility/DataAccess";
import SettingsService from '../services/SettingsService';
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
      var finalOptions = {};
      if(props.isVisible) {
      try {
        var pairs = extractDropdownPairs(props.selectedTable)
        SettingsService.executeSQLQueryBatch(pairs)
        .then(result => {
            var data = result;
            for(var i = 0; i < props.selectedTable.value.length; i++) {
                var current = props.selectedTable.value[i];
                var currentData = data[current.accessor];
                var type = current.type;
                if(type === "dropdown") {
                  const options = currentData.map(item => {
                    const value = current.columnOrder.map(field => item[field]).join('|');
                    return { value, label: value };
                  });
                  
                  finalOptions[current.accessor] = options;

                }
            }


            console.log(finalOptions);
        })
        .catch(error => {
          console.error("Error:", error);
        });

        
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