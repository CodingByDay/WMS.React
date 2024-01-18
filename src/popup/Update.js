import React, { useState, useEffect } from 'react';
import Select, { components } from 'react-select';

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

      connectSelections()

    }

  }, [props.isVisible]);

  useEffect(() => {

      connectData() 
    
  }, []);

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
                    const properties = current.columnOrder.map(field => item[field]);
                    const names = current.columnOrderTranslation.map(field => field);
                    const widths = current.columnOrderWidth.map(field => field);                
                    return { value: properties.join('|'), label: properties.join('|'), id: item[current.dropdownId], properties, names, widths, header: false, helper: item[current.dropdownHelperField]  };
                  });
                  
       
                  var emptyOption = { value: 'Test', label: 'Test', id: '', properties: current.columnOrderTranslation, widths: current.columnOrderWidth, helper: '', names: current.columnOrderTranslation, header: true }

                  finalOptions[current.accessor] = [emptyOption, ...options];

                }
            }

   
            setDropdownOptions((prevOptions) => {
              return {
                ...prevOptions,
                ...finalOptions,
              };
            });
            
       


        })
        .catch(error => {
        });

        
      } catch (error) {

      }

    
    };



  function connectSelections() {



    var table = props.selectedTable.value;
      var prevData = props.data;
      for (const key in prevData) {

        if (prevData.hasOwnProperty(key)) {
          const value = prevData[key];

          const found = table.find(item => item.accessor === key);
          if(!found) {
            continue;
          }
          const structureType = found.type;
          if(structureType === "dropdown") {
            if(found.dropdownId === key) {
      
              var specificObject = dropdownOptions[key]
              var insertObject = specificObject.find(item => item.id === value);



              setSelectedOptions(prevSelectedOptions => ({
                ...prevSelectedOptions,
                [key]: insertObject
              }));
  

      
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

    var specificObject = dropdownOptions[accessor]
    var insertObject = specificObject.find(item => item.id === selected.id);
    setSelectedOptions({
      ...selectedOptions,
      [accessor]: insertObject
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

    console.log(selectedOptions)
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

                var theValue = selectedOptions[accessor].id;
                var theValueInsideQuery = "@" + accessor;
                updateQuery = updateQuery.replace(theValueInsideQuery, theValue);
                

            } else if(type == "checkbox") {

                var theValue = selectedOptions[accessor];
                var theValueInsideQuery = "@" + accessor;
                updateQuery = updateQuery.replace(theValueInsideQuery, theValue);              
            }
        }    
    }

      const userId = localStorage.getItem('name');

      updateQuery = updateQuery.replace("@user", userId);  
      
      updateQuery = updateQuery.replace("@id", props.id); 

      console.log(updateQuery);
     

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





  const DynamicFormatOptionLabel = ({ label, properties, widths, header, selected, id}) => (


    
    <div>
      {properties && properties.length > 0 && !selected ? (
        <div style={{ display: 'flex', margin: '0', padding: '0'  }}>
          {properties.map((property, index) => (
              ( !header ) ? (
              <div key={index} style={{ minWidth: widths[index], paddingLeft: '3px', paddingRight: '3px', fontSize: '80%', color: 'gray', marginRight: '0px', whiteSpace: 'nowrap' }}>
              {property}
              </div>
          ): (
              <div key={index} style={{ fontWeight: '600',  minWidth: widths[index], paddingLeft: '5px', paddingRight: '3px', fontSize: '80%', color: 'black', marginRight: '0px', whiteSpace: 'nowrap' }}>
                {property}
              </div>
            )         
          ))}
        </div>
      ) : (
        <div style={{ fontSize: '100%' }}>
          {id}
        </div>
      )}
    </div>
  );
  
  
  

  const formatOptionLabel = ({ label, properties, widths, header, id }) => {
    const exists = Object.values(selectedOptions).some(item => item.id === id);

    
  
    // Return the component with the processed data
    return (
      <DynamicFormatOptionLabel properties={properties} id={id} label={label} widths={widths} header={header} selected = {exists} />
   );
  };
  

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
              <div className='complete select'>

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

              <label htmlFor={column.accessor+ "-helper"}>Dodatno:</label>

              <input
              type='text'
              id={column.accessor + "-helper"}
              name={column.accessor+  "-helper"}
              className='form-control'
              value={(selectedOptions[column.accessor] && selectedOptions[column.accessor].helper) || ''} // Set the value from state
              contentEditable={false}
            />

            </div>
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