import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import TransactionService from '../services/TransactionService';
import ListingService from '../services/ListingService';
import { useSelector, useDispatch } from 'react-redux'
import DataAccess from "../utility/DataAccess";
import SettingsService from '../services/SettingsService';
import Swal from 'sweetalert2';

const Update = (props) => {
  const [dropdownOptions, setDropdownOptions] = useState({});
  const [selectedOptions, setSelectedOptions] = useState({});
  const [dropdownLayouts, setDropdownLayouts] = useState({});
  const [inputValues, setInputValues] = useState({});

 
  useEffect(() => {

    var isUpdate = props.isVisible;

    if(isUpdate) {
      connectData()
      connectSelections();

    }

  }, [props.isVisible]);




  function extractDropdownPairs(data) {
    const dropdownPairs = {};
    data.value.forEach((column) => {
      if (column.type === 'dropdown') {
        dropdownPairs[column.accessor] = column.sourceSelect || '';
      }

    });
  
    return dropdownPairs;
  }
  const getValue = (inputName) => inputValues[inputName] || '';

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

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
                var emptyOption = { value: '', label: '', id: '' }
                if(type === "dropdown") {
                  const options = currentData.map(item => {
                    const properties = current.columnOrder.map(field => item[field]);
                    const names = current.columnOrderTranslation.map(field => field);

                    return { value: properties.join('|'), label: properties.join('|'), id: item[current.dropdownId], properties, names };
                  });
                  
                  console.log(options);

                  finalOptions[current.accessor] = [emptyOption, ...options];

                }
            }


            setDropdownOptions(finalOptions);

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



  function connectSelections() {
    var table = props.selectedTable.value;
      var prevData = props.data;
      for (const key in prevData) {
        if (prevData.hasOwnProperty(key)) {
          const value = prevData[key];
          const found = table.find(item => item.accessor === key);
    
          const structureType = found.type;
          if(structureType === "dropdown") {
            if(found.dropdownId === key) {
            setSelectedOptions({
              ...selectedOptions,
              [key]: {value: value, label: value},
            });
          }
          } else if (structureType === "text") {


  
            setInputValues((prevValues) => ({
              ...prevValues,
              [key]: value,
            }));


          } else if (structureType === "checkbox") {

        }

        
      }
    }
  }

  if (!props.isVisible) {
     return null;
  } 

   function onClose() {
    setSelectedOptions({})
    setInputValues({})
    props.onClose();
  }
  const handleSelectChange = (accessor, selected) => {

    setSelectedOptions({
      ...selectedOptions,
      [accessor]: {value: selected.id, label: selected.id},
    });
  };
  const options = [
    { label: 'Column 1', options: [{ value: 'Value 1', label: 'Label 1' }, /* ... */] },
    { label: 'Column 2', options: [{ value: 'Value 2', label: 'Label 2' }, /* ... */] },
    // Dodajte več stolpcev po potrebi
  ];

  const formatGroupLabel = data => (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <strong>{data.label}</strong>
    </div>
  );


  const sendData = () => {


    var updateQuery = props.selectedTable.updateQuery;
    var columns = props.selectedTable.value;



    for (let i = 0; i < columns.length; i++) {
        var column = columns[i];
        var type = column.type;
        var accessor = column.accessor;
        if(accessor!="nothing") {
            if(type == "text") {

                var theValue = getValue(accessor);
                var theValueInsideQuery = "@" + accessor;
                updateQuery = updateQuery.replace(theValueInsideQuery, theValue);

            } else if(type == "dropdown") {

                var theValue = selectedOptions[accessor].value;
                var theValueInsideQuery = "@" + accessor;
                updateQuery = updateQuery.replace(theValueInsideQuery, theValue);
                

            } else if(type == "checkbox") {

                var theValue = selectedOptions[accessor];
                var theValueInsideQuery = "@" + accessor;
                updateQuery = updateQuery.replace(theValueInsideQuery, theValue);              
            }
        }    
    }

 


      SettingsService.insertSQLQuery(updateQuery)
      .then(result => {
          props.refresh();
          var data = result;

          if(data) {
              onClose();
          } else {
            Swal.fire(
              'Napaka!',
              'Zapis ni bil posodobljen.',
              'error'
            );
            onClose();
          }

         
      })
   

      
    


  };

  const DynamicFormatOptionLabel = ({ label, properties, names }) => (
    <div>
      {properties && properties.length > 0 ? (
        <div style={{ display: 'flex' }}>
          {properties.map((property, index) => (
            property && (
              <div key={index} style={{ width: '200px', padding: '3px', fontSize: '80%', color: 'gray', marginRight: '0px', whiteSpace: 'nowrap' }}>
                <strong style={{ fontWeight: 'bold', color: 'black' }}>{names[index]}:</strong> {property}
              </div>
            )
          ))}
        </div>
      ) : (
        <div style={{ fontSize: '100%' }}>
          {label}
        </div>
      )}
    </div>
  );
  
  
  

  const formatOptionLabel = ({ label, properties, names }) => (
    <DynamicFormatOptionLabel properties={properties} label={label} names = {names} />
  );


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
               options={dropdownOptions[column.accessor] || []}
               value={selectedOptions[column.accessor]}
               getOptionLabel={(option) => option.label}
               getOptionValue={(option) => option.value}
               formatOptionLabel={formatOptionLabel}
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
              Posodobi
            </span>


            
            </center>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Update;